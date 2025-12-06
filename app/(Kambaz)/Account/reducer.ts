import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Database";

const initialState: { currentUser: User | null; isLoading: boolean } = {
    currentUser: null,
    isLoading: true,
};
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
            state.isLoading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});
export const { setCurrentUser, setLoading } = accountSlice.actions;
export default accountSlice.reducer;
