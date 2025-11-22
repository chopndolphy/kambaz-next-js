import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Enrollment, enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState: {
    enrollments: Enrollment[],
} = {
    enrollments: [],
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        addEnrollment: (
            state,
            {
                payload: { userId, courseId },
            }: PayloadAction<{ userId: string; courseId: string }>,
        ) => {
            const newEnrollment: Enrollment = {
                _id: uuidv4(),
                user: userId,
                course: courseId,
            };
            state.enrollments = [...state.enrollments, newEnrollment];
        },
        deleteEnrollment: (
            state,
            { payload: enrollmentId }: PayloadAction<string>,
        ) => {
            state.enrollments = state.enrollments.filter(
                (enrollment: Enrollment) => enrollment._id !== enrollmentId,
            );
        },
    },
});
export const { addEnrollment, deleteEnrollment, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
