import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/Auth/AuthSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading, error }] = useRegisterMutation();
    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('password does not match')
        } else {
            try {
                const res = await register({ username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
                toast.success('user successfuly registered')
            } catch (error) {
                console.log(error)
                toast.error(error.data.message)
            }
        }
    }


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
            <section className="pl-[10rem] flex flex-row justify-between items-center w-full h-screen overflow-hidden">
                <div className="mr-[4rem] mt-[3rem] w-[40%] max-h-full overflow-hidden">
                    <h1 className="text-2xl font-semibold mb-4">Sign up</h1>

                    <form onSubmit={submitHandler} className="container">
                        <div className="my-[1rem]">
                            <label htmlFor="username" className="block text-sm font-medium">username</label>
                            <input
                                type="text"
                                id="username"
                                className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                placeholder="Enter username" value={username} onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="my-[1rem]">
                            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-[1rem]">
                            <label htmlFor="password" className="block text-sm font-medium">Set Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="my-[1rem]">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-pink-500 px-4 py-2 rounded cursor-pointer my-[1rem]"
                        >
                            {isLoading ? <Loader /> : 'Register'}
                        </button>
                        {isLoading && <Loader />}
                    </form>
                    <div>
                        <p className="mt-4">Already have an account?{" "} <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-blue-500 hover:underline">Login</Link></p>
                    </div>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&"
                    alt=""
                    className="h-auto w-[59%] xl:block md:hidden sm:hidden rounded-lg"
                />
            </section>
        </>
    )
}


export default Register;