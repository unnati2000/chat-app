import React from "react";

const ProfileCard = () => {
  return (
    <div className="border-gray-200 rounded border">
      <div className="left flex items-center mx-3 my-5">
        <img
          src="https://ps.w.org/simple-local-avatars/assets/icon-256x256.png?rev=2406995"
          className="h-1/4 w-1/4 rounded-full"
        />
        <div className="mx-2">
          <p className="text-xl text-blue-500 font-semibold">Name</p>
          <button className="bg-blue-500 text-white px-6 rounded shadow-lg mt-1 py-1">
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
