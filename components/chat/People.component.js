const People = ({ chat }) => {
  return (
    <li>
      <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
        <img
          className="w-12 mr-3 rounded-full border"
          src={chat?.profilePicUrl}
          alt="Junior Coders"
        />
        <div className="transform translate-y-0.5 text-left">
          <h3 className="leading-4">{chat?.name}</h3>
          <span className="text-xs text-gray-500">Active 20s ago</span>
        </div>
      </button>
    </li>
  );
};

export default People;
