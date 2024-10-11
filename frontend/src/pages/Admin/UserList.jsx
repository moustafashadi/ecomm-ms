import { useState, useEffect } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} from "../../redux/api/usersApiSlice"
import Message from "../../components/message"

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUsername, setEditableUsername] = useState('');
    const [editableEmail, setEditableEmail] = useState('');

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteUser(id).unwrap();
                refetch();
                toast.success("User deleted successfully");
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    }

    const editHandler = (id, username, email) => {
        setEditableUserId(id);
        setEditableUsername(username);
        setEditableEmail(email);
    }

    const updateHandler = async (id) => {
        try {
            await updateUser({userId: id, username: editableUsername, email: editableEmail }).unwrap();
            setEditableUserId(null);
            refetch();
            toast.success("User updated successfully");
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4 ml-[4rem]">Users</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">
                    {error?.data?.message || error?.message || "An unexpected error occurred"}
                </Message>
            ) :
                (
                    <div className="flex flex-col md:flex-row justify-center align-center">
                        <table className="w-full md:w-4/5 mx-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">USERNAME</th>
                                    <th className="px-4 py-2 text-left">EMAIL</th>
                                    <th className="px-4 py-2 text-left">ADMIN</th>
                                    <th className="px-4 py-2 text-left">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td className="px-4 py-2">{user._id}</td>
                                        <td className="px-4 py-2">
                                            {editableUserId === user._id ? (
                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        value={editableUsername}
                                                        onChange={(e) => setEditableUsername(e.target.value)}
                                                        className="p-2 border text-black rounded-lg w-full"
                                                    />
                                                    <button
                                                        onClick={() => updateHandler(user._id)}
                                                        className="ml-2 bg-blue-500 text-sm py-2 px-4 rounded-lg"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    {user.username} {" "}
                                                    <button
                                                        onClick={() => editHandler(user._id, user.username, user.email)}
                                                        className="ml-2 cursor-pointer text-blue-500"
                                                    >
                                                        <FaEdit className="ml-[1rem]" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {editableUserId === user._id ? (
                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        value={editableEmail}
                                                        onChange={(e) => setEditableEmail(e.target.value)}
                                                        className="p-2 border text-black rounded-lg w-full"
                                                    />
                                                    <button
                                                        onClick={() => updateHandler(user._id)}
                                                        className="ml-2 bg-blue-500 text-sm py-2 px-4 rounded-lg"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    {user.email} {" "}
                                                    <button
                                                        onClick={() => editHandler(user._id, user.username, user.email)}
                                                        className="ml-2 cursor-pointer text-blue-500"
                                                    >
                                                        <FaEdit className="ml-[1rem]" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {user.isAdmin ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {!user.isAdmin && (
                                                <button
                                                    onClick={() => deleteHandler(user._id)}
                                                    className="bg-red-500 hover:bg-red-700 text-sm px-4 py-2 rounded-lg"
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </div>
    )
}

export default UserList