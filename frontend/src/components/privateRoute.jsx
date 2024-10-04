import { Navigate , Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const privateRoute = () => {
    const {userInfo} = useSelector(state => state.auth)
  return userInfo ? <Outlet /> : <Navigate to="/login" replace/>
}

export default privateRoute