import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { BiLoader } from "react-icons/bi"
import { setCredentials } from "../../redux/features/Auth/AuthSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/usersApiSlice"
import { set } from "mongoose"
import Loader from "../../components/Loader"

const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector(state => state.auth)
    const [updateProfile, { isLoading: loadingUpdateProfile, isSuccess, isError, error }] = useProfileMutation()

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.email, userInfo.username])

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Password does not match");
        } else{
            try {
                const result = await updateProfile({_id: userInfo._id, username,email,password}).unwrap();
                dispatch(setCredentials(result));
                toast.success("Profile Updated Successfully"); 
            } catch(error){
                const errorMessage = error?.data?.detail || error?.message || "An unexpected error occurred";
                toast.error(errorMessage);
            }
        }
    }

    return (
        <div className="container p-4">
            <div className="flex justify-left align-left md:flex md:space-x-4 ml-[4rem] mt-[7rem]">
                <div className="w-[40%]">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium">email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                name="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                        </div>
                        <div className="flex justify-between">
                            <button 
                                type="submit" 
                                className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-pink-600">
                            Update</button>
                            <Link to="/user-orders" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-pink-600">My Orders</Link>
                        </div>
                    </form>
                </div>
                {loadingUpdateProfile && <Loader/>}
            </div>
        </div>
    )
}

export default Profile