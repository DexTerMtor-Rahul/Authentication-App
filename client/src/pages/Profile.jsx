import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-indigo-50 min-h-screen">
      <div className="mx-auto flex flex-col items-center justify-center px-2 md:mt-0 sm:max-w-md xl:p-0  ">
        <div className="mt-10 bg-white w-full rounded-lg shadow-md px-8 py-8 ">
          <h1 className="mb-8 text-3xl font-semibold text-center">Profile</h1>
          <div className="mb-10 flex flex-col items-center justify-center cursor-pointer">
            <img
              src={currentUser.profilePicture}
              alt="profile"
              className="h-100 w-100 rounded-full object-cover"
            />
          </div>
          <form>
            <input
              defaultValue={currentUser.username}
              type="text"
              className=" bg-indigo-50 w-full p-3 rounded-lg mb-4"
              name="username"
              placeholder="Username"
              id="username"
              // onChange={handleChange}
            />
            <input
              defaultValue={currentUser.email}
              type="text"
              className=" bg-indigo-50 w-full p-3 rounded-lg mb-4"
              name="email"
              placeholder="Email"
              id="email"
              // onChange={handleChange}
            />

            <input
              type="password"
              className=" bg-indigo-50 w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              id="password"
              // onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded-lg text-white bg-indigo-700 hover:opacity-85 disabled:opacity-80 focus:outline-none my-1">
              Update
            </button>
          </form>

          <div className="flex justify-between mt-5">
            <span className="text-md  text-red-500 cursor-pointer hover:text-red-700">
              Delete Account{" "}
            </span>
            <span className="text-md text-red-500 cursor-pointer  hover:text-red-700">
              Sign Out{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
