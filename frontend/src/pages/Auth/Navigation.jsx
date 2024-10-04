import { useState } from 'react';
import { 
    AiOutlineHome, 
    AiOutlineShopping,         
    AiOutlineLogin, 
    AiOutlineUserAdd
    ,AiOutlineShoppingCart,
    AiOutlineHeart,
    AiOutlineUser} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import {useLoginMutation, useLogoutMutation} from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/Auth/AuthSlice';

const Navigation = () =>{
    const {userInfo} = useSelector(state => state.auth);
    //hooks
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = ()=>{
        setDropdownOpen(!dropdownOpen);
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const closeSidebar = () => {
        setShowSidebar(false);
    }

    const closeDropdown = () => {
        setDropdownOpen(false);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async() => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error){
            console.error(error);
        }
    };

    return (
        <div 
            style = {{zIndex: 999}} 
            className={`${showSidebar ? "hidden" : 'flex'} xl:flex lg:flex md:hidden 
            sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
            id="navigation-container"
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link 
                    to = "/"
                    className='flex items-center transition-transform transform 
                    hover:translate-x-2'>
                    <AiOutlineHome className = "mr-2 mt-[3rem]" size = {26}/>
                    <span className = "hidden nav-item-name mt-[3rem]">HOME</span>{" "}
                </Link>
                <Link 
                    to = "/shop"
                    className='flex items-center transition-transform transform 
                    hover:translate-x-2'>
                    <AiOutlineShopping className = "mr-2 mt-[3rem]" size = {26}/>
                    <span className = "hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
                </Link>
                <Link 
                    to = "/cart"
                    className='flex items-center transition-transform transform 
                    hover:translate-x-2'>
                    <AiOutlineShoppingCart className = "mr-2 mt-[3rem]" size = {26}/>
                    <span className = "hidden nav-item-name mt-[3rem]">CART</span>{" "}
                </Link>
                <Link 
                    to = "/favorites"
                    className='flex items-center transition-transform transform 
                    hover:translate-x-2'>
                    <AiOutlineHeart className = "mr-2 mt-[3rem]" size = {26}/>
                    <span className = "hidden nav-item-name mt-[3rem]">FAVORITES</span>{" "}
                </Link>
            </div>
            <div className="relative">
                <button 
                    onClick={toggleDropdown} 
                    className="flex items-center text-gray-800 focus:outline-none w-full"
                >
                    {userInfo ? (
                        <>
                            <AiOutlineUser size={26} className='flex items-center transition-transform transform text-white' />
                            <span 
                                className='nav-item-name transition-transform transform text-white'>{userInfo.username}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ml-1 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7" 
                                />
                            </svg>
                        </>
                    ) : <></>}
                </button>
                {dropdownOpen && userInfo && (
                    <ul 
                        onMouseLeave={closeDropdown}
                        className={`absolute right-0 space-y-2 bg-white text-gray-600 shadow-lg rounded-lg ${userInfo.isAdmin ? 'mt-[-350px]' : 'mt-[-100px]' } `}
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link to="/admin/dashboard">Dashboard</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link to="/admin/products">Products</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link to="/admin/categories">Categories</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link to="/admin/orders">Orders</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link to="/admin/users">Users</Link>
                                </li>
                            </>
                        )}
                        <li className="px-4 py-2 hover:bg-gray-100">
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    </ul>
                )}
            </div>

            {!userInfo && (
                <ul>
                    <li>
                        <Link 
                            to = "/login"
                            className='flex items-center transition-transform transform 
                            hover:translate-x-2'>
                            <AiOutlineLogin className = "mr-2 mt-[3rem]" size = {26}/>
                            <span className = "hidden nav-item-name mt-[3rem]">Login</span>{" "}
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to = "/register"
                            className='flex items-center transition-transform transform 
                            hover:translate-x-2'>
                            <AiOutlineUserAdd className = "mr-2 mt-[3rem]" size = {26}/>
                            <span className = "hidden nav-item-name mt-[3rem]">Sign up</span>{" "}
                        </Link>
                    </li>
                </ul>
            )}
    </div>);
};

export default Navigation;