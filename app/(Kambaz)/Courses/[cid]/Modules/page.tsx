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
import { Module, Lesson } from "../../../Database";
import * as client from "../../client";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@/app/(Kambaz)/store";

export default function Modules() {
    const { cid } = useParams<{ cid: string }>();
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const [moduleName, setModuleName] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchModules = async () => {
            try {
                console.log("Fetching modules for course:", cid);
                const modules = await client.findModulesForCourse(cid as string);
                console.log("Modules received:", modules);
                dispatch(setModules(modules));
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        };
        fetchModules();
    }, [cid, dispatch]);
    const onCreateModuleForCourse = async () => {
        if (!cid) return;
        const newModule = {
            _id: uuidv4(),
            name: moduleName,
            description: "",
            course: cid,
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

    return (
        <div>
            <ModulesControls
                setModuleName={setModuleName}
                moduleName={moduleName}
                addModule={onCreateModuleForCourse}
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
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
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

                            <ModuleControlButtons
                                moduleId={module._id}
                                deleteModule={(moduleId) => {
                                    onRemoveModule(moduleId);
                                }}
                                editModule={(moduleId) => {
                                    dispatch(editModule(moduleId));
                                }}
                            />
                        </div>
                        {module.lessons && (
                            <ListGroup className="wd-lessons rounded-0">
                                {module.lessons.map((lesson) => (
                                    <ListGroupItem
                                        className="wd-lesson p-3 ps-1"
                                        key={lesson._id}
                                    >
                                        <BsGripVertical className="me-2 fs-3" />
                                        {lesson.name}
                                        <LessonControlButtons />
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
