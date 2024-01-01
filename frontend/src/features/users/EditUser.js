import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from './usersApiSlice'

const EditUser = () => {
    const { id } = useParams()

    //const user = useSelector(state => selectUserById(state, id)) 
        //doesnt query data, so no subscription and the data is therefore unused.
        // our wrapping of App in Prefetch that we created stops this.

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    if (!user) return <PulseLoader color={"#FFF"} />

    const content = <EditUserForm user={user} />

    return content
}
export default EditUser