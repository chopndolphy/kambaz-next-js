import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "../../../types";
import { v4 as uuidv4 } from "uuid";
const initialState: {
    quizzes: Quiz[];
} = {
    quizzes: [],
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }: PayloadAction<Quiz>) => {
            state.quizzes = [...state.quizzes, quiz];
        },
        deleteQuiz: (state, { payload: quizId }: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter((q: Quiz) => q._id !== quizId);
        },
        updateQuiz: (state, { payload: quiz }: PayloadAction<Quiz>) => {
            state.quizzes = state.quizzes.map((q: Quiz) =>
                q._id === quiz._id ? quiz : q,
            );
        },
    },
});
export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
    quizzesSlice.actions;
export default quizzesSlice.reducer;
