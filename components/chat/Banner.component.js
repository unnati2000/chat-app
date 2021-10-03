const Banner = () => {
  return (
    <div className="border-b border-gray-200 flex items-center space-x-2 p-2 sticky">
      <img
        src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWF8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
        className="rounded-full object-cover"
      />
      <h3 className="font-semibold text-xl text-gray-600">name</h3>
    </div>
  );
};

export default Banner;
