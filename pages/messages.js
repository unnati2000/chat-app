import axios from "axios";
import cookie from "js-cookie";
import io from "socket.io-client";
import { useState, useRef, useEffect } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import baseURL from "../utils/baseURL.utils";
import getUserInfo from "../utils/getUserInfo.utils";

import ChatText from "../components/chat/ChatText.component";
import ChatWindow from "../components/chat/ChatWindow.component";
import People from "../components/chat/People.component";
import WindowHeader from "../components/chat/WindowHeader.component";
import Search from "../components/chat/Search.component";
import ChatWindowIcon from "../components/chat/ChatWindow.component";

const getChats = async (token) => {
  const { data } = await axios.get(`${baseURL}/api/chats`, {
    headers: { Authorization: token },
  });
  return data;
};

const scrollToBottom = (divRef) => {
  divRef.current && divRef.current.scrollIntoView({ behaviour: "smooth" });
};

const Messages = ({ user }) => {
  const { data } = useQuery(["messages"], () => getChats(cookie.get("token")));
  console.log({ data });

  const router = useRouter();
  const { chat } = router.query;

  if (chat === user?._id) {
    router.push("/messages");
  }

  const [chats, setChats] = useState(data || []);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [banner, setBanner] = useState({ name: "", profilePicUrl: "" });

  const socket = useRef();
  const openChatId = useRef("");
  const divRef = useRef();

  // connection to a socket
  useEffect(() => {
    if (!socket?.current) {
      socket.current = io(baseURL);
    }
    if (socket?.current) {
      socket.current.emit("join", { userId: user._id });
      socket.current.on("connectedUsers", ({ users }) => {
        users?.length > 0 && setConnectedUsers(users);
      });
    }
  }, []);

  // Loading messages from socket
  useEffect(() => {
    // onclicking someone's chat tab
    const loadMessages = () => {
      // req backend
      socket.current.emit("loadMessages", {
        userId: user._id,
        messagesWith: chat,
      });

      // res from backend

      socket.current.on("messagesLoaded", ({ chat }) => {
        setMessages(chat.messages);
        setBanner({
          name: chat.messagesWith.name,
          profilePicUrl: chat.messagesWith.profilePicUrl,
        });
        openChatId.current = chat.messagesWith._id;
        divRef.current && scrollToBottom(divRef);
      });

      // if user did not chat with anyone before
      socket.current.on("noChatFound", async () => {
        const data = await getUserInfo(chat);
        console.log(data);
        if (data?.name && data?.profilePicUrl) {
          console.log("yes");
          const chatAlreadyExists = chats?.find(
            (chatItem) => chatItem.messagesWith === chat
          );
          if (!chatAlreadyExists) {
            console.log("yes2");
            const newChat = {
              messagesWith: chat,
              name: data.name,
              profilePicUrl: data.profilePicUrl,
              lastMessage: "",
              date: Date.now(),
            };
            console.log(newChat);
            console.log("yes3");
            setChats((prevState) => [newChat, ...prevState]);
            console.log(chats);
            console.log("yes4");
          }
          setBanner({ name: data?.name, profilePicUrl: data?.profilePicUrl });
          setMessages([]);
          openChatId.current = router.query.chat;
        }
      });
    };

    if (socket.current && router.query.chat) {
      loadMessages();
    }
  }, [router.query.chat]);

  const sendMessage = (message) => {
    if (socket.current) {
      socket.current.emit("newMessage", {
        userId: user._id,
        receiver: openChatId.current || router.query.chat,
        message,
      });
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("messageSent", ({ newMessage }) => {
        if (newMessage.receiver === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMessage.receiver
            );
            previousChat.lastMessage = newMessage.message;
            previousChat.date = newMessage.date;
            return [...prev];
          });
        }
      });

      socket.current.on("newMessageReceived", async ({ newMessage }) => {
        let senderName;

        if (newMessage.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMessage.sender
            );
            previousChat.lastMessage = newMessage.message;
            previousChat.date = newMessage.date;
            senderName = previousChat.name;
            return [...prev];
          });
        } else {
          const previouslyMessaged =
            chat.filter((chat) => chat.messagesWith === newMessage.sender)
              .length > 0;
          if (previouslyMessaged) {
            setChats((prev) => {
              const previousChat = prev.find(
                (chat) => chat.messagesWith === newMessage.sender
              );
              previousChat.lastMessage = newMessage.message;
              previousChat.date = newMessage.date;
              senderName = previousChat.name;
              return [...prev];
            });
          } else {
            const { name, profilePicUrl } = await getUserInfo(
              newMessage.sender
            );
            senderName = name;
            const newChat = {
              messagesWith: newMessage.sender,
              name,
              profilePicUrl,
              lastMessage: newMessage.message,
              date: newMessage.date,
            };
            setChats((prev) => [newChat, ...prev]);
          }
        }
        messageNotification(senderName);
      });
    }
  }, []);

  useEffect(() => {
    messages.length > 0 && scrollToBottom(divRef);
  }, [messages]);

  return (
    <div className="bg-gray-50 w-screen h-screen sm:p-5">
      <div className="bg-white border border-gray-200 rounded flex h-full">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full">
          <div className="border-b border-gray-200 p-3 relative">
            <button className="flex items-center mx-auto select-none font-semibold focus:outline-none">
              {user?.name}
            </button>
          </div>

          <Search chats={chats} setChats={setChats} />
          <ul className="py-1 overflow-auto">
            {chats ? (
              chats?.map((chat) => (
                <People chat={chat} connectedUsers={connectedUsers} />
              ))
            ) : (
              <h1 className="text-blue-500 font-lg">No Users</h1>
            )}
          </ul>
        </div>

        <div className="flex-col sm:w-1/2 md:w-2/3 lg:w-3/4 border-l border-gray-200 sm:flex items-center">
          {banner?.name && banner?.profilePicUrl ? (
            <>
              <WindowHeader banner={banner} />
              <div className="my-2">
                {console.log(messages)}
                {messages?.map((message, index) => {
                  {
                    console.log(message);
                  }
                  <ChatWindow
                    divRef={divRef}
                    key={index}
                    message={message}
                    user={user}
                    setMessages={setMessages}
                    messagesWith={chat}
                  />;
                })}
              </div>
              <div className="content-end">
                <ChatText sendMessage={sendMessage} />
              </div>
            </>
          ) : (
            <ChatWindowIcon />
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["messages"], () => getChats(token));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Messages;
