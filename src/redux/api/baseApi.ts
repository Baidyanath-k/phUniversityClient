import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQueries = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: 'include',
    prepareHeaders: (headers, api) => {
        const token = (api.getState() as RootState).auth.token;
        if (token) {
            headers.set(`authorization`, `${token}`)
        }
        return headers;
    }
});

const baseQueryWithRefreshToken: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQueries(args, api, extraOptions);

    // User not found
    if (result.error?.status === 404) {
        toast.error("User not found!!")
    }

    if (result.error?.status === 401) {

        // Sending refresh token
        console.log("Sending refresh token!!")
        const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
            method: "POST",
            credentials: 'include',
        });

        const data = await res.json();

        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;

            api.dispatch(
                setUser({
                    user: user,
                    token: data.data.accessToken
                }));

            result = await baseQueries(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;

};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
});
