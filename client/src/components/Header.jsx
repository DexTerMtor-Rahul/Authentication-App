import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="bg-indigo-700">
        <div className=" flex justify-between mx-auto max-w-6xl items-center">
          {/* Header Text */}
          <Link to="/">
            <div className="flex items-center text-4xl font-extrabold dark:text-white px-2.5 py-2.5">
              Auth
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                App
              </span>
            </div>
          </Link>

          {/* Nav bars */}
          <div className="hidden w-full md:block md:w-auto text-white text-lg m-3 rounded-sm">
            <ul className="flex gap-6">
              <Link to="/">
                <li className="px-3">Home</li>
              </Link>

              <Link to="/about">
                <li className="px-3">About</li>
              </Link>

              <Link to="/sign-in">
                <li className="px-3">Sign In</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
