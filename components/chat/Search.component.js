const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name or username"
        className="w-full bg-gray-100 p-2 border-0 border-b border-gray-200 focus:ring-pink-600 focus:border-pink-600"
      />

      <div className="absolute space-y-1 top-14 w-full bg-white z-50 py-2 shadow-2xl rounded">
        <div className="flex items-center cursor-pointer px-2 py-1 hover:bg-gray-100">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            className="rounded-full object-cover"
          />
          <p className="text-md ml-2"></p>
        </div>
      </div>
    </div>
  );
};

export default Search;
