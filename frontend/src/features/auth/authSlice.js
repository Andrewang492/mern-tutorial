//not api slice, but a traditional slice for redux.
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            console.log('setting credentials using')
            console.log(action.payload)
            const { accessToken } = action.payload
            state.token = accessToken //not state.auth.token because here we are already in the auth slice...
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token