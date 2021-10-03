const Message = () => {
  return (
    <div className={`w-max max-w-xs md:max-w-xs lg:max-w-md xl:max-w-lg mb-2`}>
      <div className={` rounded-lg py-2 mb-1 font-medium px-4 text-left`}>
        <p className="break-words">Msg</p>
      </div>
      <p className={`text-xs text-gray-400 `}>23/34/33</p>
    </div>
  );
};

export default Message;
