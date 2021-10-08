import React from "react";
import Link from "next/link";

const ProfileCard = ({ profile }) => {
  return (
    <div className="border-gray-200 rounded border">
      <div className="left flex items-center mx-3 my-5">
        <img
          src={profile?.profilePicUrl}
          className="h-1/4 w-1/4 rounded-full"
        />
        <div className="mx-2">
          <p className="text-xl text-blue-500 font-semibold">{profile?.name}</p>
          <button className="bg-blue-500 text-white px-6 rounded shadow-lg mt-1 py-1">
            <Link href="/messages">Chat</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
