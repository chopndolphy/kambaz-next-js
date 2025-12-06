import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Module } from "../../../types";
import { v4 as uuidv4 } from "uuid";
const initialState: {
    modules: Module[];
} = {
    modules: [],
};
const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setModules: (state, action) => {
            state.modules = action.payload;
        },

        addModule: (
            state,
            { payload: module }: PayloadAction<{ name: string }>,
        ) => {
            const newModule: Module = {
                _id: uuidv4(),
                lessons: [],
                name: module.name,
                description: "",
            };
            state.modules = [...state.modules, newModule];
        },
        deleteModule: (state, { payload: moduleId }: PayloadAction<string>) => {
            state.modules = state.modules.filter((m: Module) => m._id !== moduleId);
        },
        updateModule: (state, { payload: module }: PayloadAction<Module>) => {
            state.modules = state.modules.map((m: Module) =>
                m._id === module._id ? module : m,
            );
        },
        editModule: (state, { payload: moduleId }: PayloadAction<string>) => {
            state.modules = state.modules.map((m: Module) =>
                m._id === moduleId ? { ...m, editing: true } : m,
            );
        },
    },
});
export const { addModule, deleteModule, updateModule, editModule, setModules } =
    modulesSlice.actions;
export default modulesSlice.reducer;
