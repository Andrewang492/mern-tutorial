import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'

const EditUser = () => {
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id)) //doesnt query data, so no subscription and the data is therefore unused.
    // our wrapping of App in Prefetch that we created stops this.

    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

    return content
}
export default EditUser