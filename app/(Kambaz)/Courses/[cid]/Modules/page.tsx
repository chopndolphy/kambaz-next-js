"use client";
import {
    setModules,
    addModule,
    editModule,
    updateModule,
    deleteModule,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "next/navigation";
import { Module, Lesson } from "../../../types";
import * as client from "../../client";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@/app/(Kambaz)/store";

export default function Modules() {
    const { cid } = useParams<{ cid: string }>();
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const [moduleName, setModuleName] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchModules = async () => {
            const modules = await client.findModulesForCourse(cid as string);
            dispatch(setModules(modules));
        };
        fetchModules();
    }, [cid, dispatch]);
    const onCreateModuleForCourse = async () => {
        if (!cid) return;
        const newModule = {
            _id: uuidv4(),
            name: moduleName,
            description: "",
        };
        const createdModule = await client.createModuleForCourse(cid, newModule);
        dispatch(setModules([...modules, createdModule]));
    };
    const onRemoveModule = async (moduleId: string) => {
        await client.deleteModule(cid, moduleId);
        dispatch(setModules(modules.filter((m) => m._id !== moduleId)));
    };
    const onUpdateModule = async (module: Module) => {
        await client.updateModule(cid, module);
        const newModules = modules.map((m) => (m._id === module._id ? module : m));
        dispatch(setModules(newModules));
    };

    if (!currentUser) {
        return;
    }

    const showControls =
        currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

    return (
        <div>
            <ModulesControls
                setModuleName={setModuleName}
                moduleName={moduleName}
                addModule={onCreateModuleForCourse}
                userRole={currentUser.role}
            />
            <br />
            <br />
            <br />
            <br />

            <ListGroup className="rounded-0" id="wd-modules">
                {modules.map((module: Module) => (
                    <ListGroupItem
                        className="wd-module p-0 mb-5 fs-5 border-gray"
                        key={module._id}
                    >
                        <div
                            className={
                                showControls
                                    ? "wd-title p-3 ps-2 bg-secondary"
                                    : "wd-title p-3 ps-3 bg-secondary"
                            }
                        >
                            {showControls && <BsGripVertical className="me-2 fs-3" />}
                            {!module.editing && module.name}
                            {module.editing && (
                                <FormControl
                                    className="w-50 d-inline-block"
                                    onChange={(e) =>
                                        dispatch(updateModule({ ...module, name: e.target.value }))
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onUpdateModule({ ...module, editing: false });
                                        }
                                    }}
                                    defaultValue={module.name}
                                />
                            )}

                            {showControls && (
                                <ModuleControlButtons
                                    moduleId={module._id}
                                    deleteModule={(moduleId) => {
                                        onRemoveModule(moduleId);
                                    }}
                                    editModule={(moduleId) => {
                                        dispatch(editModule(moduleId));
                                    }}
                                />
                            )}
                        </div>
                        {module.lessons && (
                            <ListGroup className="wd-lessons rounded-0">
                                {module.lessons.map((lesson) => (
                                    <ListGroupItem
                                        className={showControls ? "wd-lesson p-3 ps-1" : "p-3 ps-3"}
                                        key={lesson._id}
                                    >
                                        {showControls && <BsGripVertical className="me-2 fs-3" />}
                                        {lesson.name}
                                        {showControls && <LessonControlButtons />}
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}
