import Link from "next/link";
import Image from "next/image";

const Navbar = ({ user }) => {
  return (
    <nav className="flex justify-between shadow-md">
      <h2 className="text-3xl p-3 text-blue-500 font-bold ">Chit Chat</h2>
      <div className="flex items-center px-3">
        {user ? (
          <>
            <Link href="/">
              <p className="text-blue-500 hover:text-blue-600 text-lg px-3 cursor-pointer">
                Home
              </p>
            </Link>

            <Link href="">
              <Image
                src="/images.png"
                className="rounded-full"
                height="35"
                width="35"
              />
            </Link>
          </>
        ) : (
          <>
            <Link href="/signup">
              <p className="text-blue-500 hover:text-blue-600  text-lg px-3 cursor-pointer">
                Sign Up
              </p>
            </Link>
            <Link href="/signin">
              <p className="text-blue-500 hover:text-blue-600 text-lg px-3 cursor-pointer">
                Sign In
              </p>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
