import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col">
      <div className="mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
        <div className="bg-white w-full rounded-lg shadow-md px-6 py-8 ">
          <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
          <form>
            <input
              type="text"
              className=" bg-indigo-50 w-full p-3 rounded-lg mb-4"
              name="username"
              placeholder="Username"
              id="username"
            />

            <input
              type="email"
              className=" bg-indigo-50 w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              id="email"
            />

            <input
              type="password"
              className=" bg-indigo-50 w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              id="password"
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded-lg bg-green text-white bg-indigo-700 hover:opacity-85 disabled:opacity-80 focus:outline-none my-1">
              Sign Up
            </button>
          </form>
        </div>
        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link to="/sign-in">
            <span className="text-blue-700 px-2">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
