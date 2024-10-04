import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../features/constants";
import Register from "../../pages/Auth/Register";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({ //`mutation` is a request type that is used when we provide data to the servers
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        Register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        })
    }),
});

//`useLoginMutation` is a hook that returns a function that can be called to make the API request
//`use${EndPoint_NAME}{requestType}` is a naming convention used by redux Query to generate hooks for mutations
export const { useLoginMutation, useLogoutMutation, useRegisterMutation} = userApiSlice;