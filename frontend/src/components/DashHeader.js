import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        // SEEMS NOT TO WORK.
        if (isSuccess) {
            navigate('/') //because its looking for success of a logout.
            console.log('successful sendlogout status')
        }
    }, [isSuccess, navigate])

    if (isLoading) {
        console.log('loading logout request')
        return <p>Logging Out...</p>
    }

    if (isError) {
        console.log('errored logout request')
        return <p>Error: {error.data?.message}</p>
    }

    let dashClass = null 
    //check not on dash, notes list or users list.
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const onLogoutClicked = async () => {
        // MY FIX FOR LOGGING OUT THEN NAVIGATING.
        try {
            await sendLogout().unwrap()
            navigate('/')
        } catch {
            console.error('logout error')
        }
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={onLogoutClicked}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const content = (
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dash">
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add more buttons later */}
                    {logoutButton}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader