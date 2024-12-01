import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/Auth/AuthSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Switch from "../../components/themeToggle";
import React from "react";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Login, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector(state => state.auth)
  
  //represents the current URL and is immutable. 
  const { search } = useLocation();
  
  const searchParams = new URLSearchParams(search);

  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) { navigate(redirect);}
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      //will return a new Promise that either has the actual action,
      //payload value from a fulfilled action, or throws an error if it's the rejected action. 
      const result = await Login({ email, password }).unwrap();

      dispatch(setCredentials(result));
      
      navigate(redirect);
    } catch (error) {
      const errorMessage = error?.data?.detail || error?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };


  return (
    <>
      <style>
        {`
                    html, body {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        overflow: hidden; /* Prevent body scrolling */
                    }
                `}
      </style>
      <div className="dark:bg-gray-900 dark:text-white">
        <section className="pl-[10rem] flex flex-row justify-between items-center w-full h-screen overflow-hidden">
          <div className="mr-[4rem] mt-[3rem] w-[40%] max-h-full overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
            <form onSubmit={submitHandler} className="container">

              <div className="my-[2rem]">
                <label htmlFor="email" className="block text-sm font-medium">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="my-[2rem]">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] dark:bg-pink-700">
                {isLoading ? "Please wait..." : "Sign In"}
              </button>
              {isLoading && <Loader />}
            </form>
            <p className="block text-sm font-medium">No account? {" "}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-blue-500 hover:underline">Sign up</Link>
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.38"
            alt=""
            className="h-auto w-[59%] xl:block md:hidden sm:hidden rounded-lg"
          />
        </section>
      </div>
    </>
  );

}

export default Login;