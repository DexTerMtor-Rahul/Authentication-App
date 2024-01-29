import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({}); // {username: "", email: "", password: ""}
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handleSubmit is an async function that takes an event as an argument and
  // prevents the default behavior of the event (in this case, the default behavior is to refresh the page on submit).
  //  Then, we make a POST request to the /api/auth/signup endpoint with the formData object as the body of the request.
  //  We then convert the response to JSON and log it to the console.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);

      if (data.success === false) {
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col">
      <div className="mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
        <div className="bg-white w-full rounded-lg shadow-md px-8 py-8 ">
          <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className=" bg-indigo-50 w-full p-3 rounded-lg mb-4"
              name="username"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />

            <input
              type="email"
              className=" bg-indigo-50 w-full p-3 rounded mb-4"
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
              className="w-full text-center py-3 rounded-lg bg-green text-white bg-indigo-700 hover:opacity-85 disabled:opacity-80 focus:outline-none my-1">
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link to="/sign-in">
            <span className="text-blue-700 px-2">Sign in</span>
          </Link>
        </div>
        {error && (
          <div className="text-red-500 mt-2">Something went wrong!</div>
        )}
      </div>
    </div>
  );
}
