import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({}); // {username: "", email: "", password: ""}
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handleSubmit is an async function that takes an event as an argument and
  // prevents the default behavior of the event (in this case, the default behavior is to refresh the page on submit).
  //  Then, we make a POST request to the /api/auth/signin endpoint with the formData object as the body of the request.
  //  We then convert the response to JSON and log it to the console.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen">
      <div className="mx-auto flex flex-col items-center justify-center px-2 md:mt-0 sm:max-w-md xl:p-0  ">
        <div className="mt-10 bg-white w-full rounded-lg shadow-md px-8 py-8 ">
          <h1 className="mb-8 text-3xl font-semibold text-center">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className=" bg-indigo-50 w-full p-3 rounded-lg mb-4"
              name="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />

            <input
              type="password"
              className=" bg-indigo-50 w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              type="submit"
              className="w-full text-center py-3 rounded-lg text-white bg-indigo-700 hover:opacity-85 disabled:opacity-80 focus:outline-none my-1">
              {loading ? "Loading..." : "Sign In"}
            </button>
            <OAuth />
          </form>
        </div>
        <div className="text-grey-dark mt-6">
          New User?
          <Link to="/sign-up">
            <span className="text-blue-700 px-2">Sign Up</span>
          </Link>
        </div>
        <div className="text-red-500 mt-2">
          {error ? error.message || "Something went wrong!" : ""}
        </div>
      </div>
    </div>
  );
}
