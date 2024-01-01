import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    /*
    useEffect(() => {
        console.log('subscribing')
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate()) //a manual subscription.
        // this will give access to a state without expiring, even if you don't query it.
        // it will also mean that refreshing a form will not remove default data (not entered data), since it will look through this prefetch first
        return () => {
            console.log('unsubscribing')
            notes.unsubscribe()
            users.unsubscribe()
        }
    }, [])
    */
    useEffect(() => {               //endpoint, some name to subscribe to??, query is always made even if data exists. 
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])  // affects other files.

    return <Outlet />
    // wrap our pages with this component.
}
export default Prefetch