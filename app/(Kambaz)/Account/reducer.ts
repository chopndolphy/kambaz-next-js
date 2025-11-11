import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Database";

const initialState: { currentUser: User | null } = {
    currentUser: null,
};
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        },
    },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
