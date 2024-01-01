import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

const Note = ({ noteId }) => {
    const { note } = useGetNotesQuery("notesList", { //not using a selector anymore:
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId] //selects the note we're like for thanks to this selector on query.
        }),
    })

    const navigate = useNavigate()

    /*Self inserted!! To get username (very roundabout...) */
    const usersRes = useGetUsersQuery();
    const users = usersRes.data;
    if (usersRes.isSuccess) {
        // console.log('priting all users:')
        // console.log(users)
    }


    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        let username = 'finding username...'
        if (users) {
            const user = users.entities[note.user]
            // console.log('printing the user')
            // console.log(user)
            username = user.username
        }
        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {note.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{note.title}</td>
                <td className="table__cell note__username">{username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
const memoizedNote = memo(Note)

export default memoizedNote // will only rerender if changes to data.