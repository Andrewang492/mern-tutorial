import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

// wrapper. only shows things if the user has a role in the allowedRoles.
const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth()

    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace /> // send unauhtorised back. replace means you can press back button after logging in...
    )

    return content
}
export default RequireAuth