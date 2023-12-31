import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import setCredentials from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({ //not only baseUrl field, but two other fields for JWT's.
    baseUrl: 'http://localhost:3500',
    credentials: 'include', //will always send cookie. Now with this, navigating to get notes will use the cookie to get notes.
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {
        console.log(result)
        console.log('sending refresh token because status was 403.')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log('refresh result')
        console.log(refreshResult)
        if (refreshResult?.data) {
            console.log('refresh result has data (ie probably accessToken)')
            console.log({ accessToken: refreshResult.data.accessToken })

            // store the new token 
            api.dispatch(setCredentials({ accessToken: refreshResult.data.accessToken }))

            // retry original query with new access token
            console.log('refetching query results using new access token')
            try {
                result = await baseQuery(args, api, extraOptions).unwrap()
                console.log(result)
            } catch (error) {
                console.error(error)
            }
            
        } else {
            console.log('refresh result has no data, ie couldnt refresh the access token')
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired. "
                // i.e refresh did not work.
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})

//pretty much starter code.