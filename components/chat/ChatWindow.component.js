const ChatWindow = ({ message, user, divRef }) => {
  const isUserSender = message?.sender === user?._id;

  return (
    <div>
      {isUserSender ? (
        <div className="text-left bg-gray-100 text-gray-600 p-2 rounded my-1">
          <p>{message?.message}</p>
        </div>
      ) : (
        <div className="text-right bg-blue-100 p-2 rounded text-blue-500 my-1">
          <p>{message?.message}</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
