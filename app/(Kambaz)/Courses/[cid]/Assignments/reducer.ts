import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments, Assignment } from "../../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    assignments: assignments,
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (
            state,
            { payload: assignment }: PayloadAction<Assignment>,
        ) => {
            state.assignments = [...state.assignments, assignment];
        },
        deleteAssignment: (
            state,
            { payload: assignmentId }: PayloadAction<string>,
        ) => {
            state.assignments = state.assignments.filter(
                (a: Assignment) => a._id !== assignmentId,
            );
        },
        updateAssignment: (
            state,
            { payload: assignment }: PayloadAction<Assignment>,
        ) => {
            state.assignments = state.assignments.map((a: Assignment) =>
                a._id === assignment._id ? assignment : a,
            );
        },
    },
});
export const { addAssignment, deleteAssignment, updateAssignment } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;
