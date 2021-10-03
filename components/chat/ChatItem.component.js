import Image from "next/image";

const ChatItem = () => {
  return (
    <li className={"bg-gray-100"}>
      <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
        <div className="relative">
          <img
            className="rounded-full border object-cover"
            src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
          />
          <div
            className={`absolute bottom-1.5 right-0 rounded-full h-4 w-4 border-2 border-white `}
          ></div>
        </div>
        <div className="transform translate-y-0.5 ml-3 text-left">
          <h3 className="leading-4">
            Unnati Bamania <span className="text-xs text-gray-400">date</span>
          </h3>
          <span className="text-xs text-gray-500"></span>
        </div>
      </button>
    </li>
  );
};

export default ChatItem;
