import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

const NewNote = () => {
    const users = useSelector(selectAllUsers)//gives empty array if fails.

    if (!users?.length) return <p>Not Currently Available</p> 

    const content = <NewNoteForm users={users} />

    return content
}
export default NewNote