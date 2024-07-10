import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../../types/authUserTypes";




type authState = {
    user: null | TUser,
    token: null | object,
}
const initialState: authState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});


export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;