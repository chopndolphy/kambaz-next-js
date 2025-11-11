"use client";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentsTitleControlButtons from "./AssignmentsTitleControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiNotePencil } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import { addAssignment, deleteAssignment } from "./reducer";

export default function Assignments() {
    const { cid } = useParams<{ cid: string }>();
    const { assignments } = useSelector(
        (state: RootState) => state.assignmentsReducer,
    );
    const dispatch = useDispatch();
    return (
        <div>
            <AssignmentsControls />
            <br />
            <br />
            <br />
            <br />

            <ListGroup className="rounded-0" id="wd-assignments">
                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-assignments-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-0 fs-3" />
                        <IoMdArrowDropdown className="me-0 fs-3" />
                        ASSIGNMENTS
                        <AssignmentsTitleControlButtons />
                    </div>
                    <ListGroup id="wd-assignment-list" className="rounded-0">
                        {assignments
                            .filter((assignment) => assignment.course === cid)
                            .map((assignment) => (
                                <ListGroupItem
                                    id="wd-assignment-list-item"
                                    className="p-3 ps-1 wd-lesson"
                                    key={assignment._id}
                                >
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <BsGripVertical className="me-2 fs-3" />
                                            <PiNotePencil className="me-4 fs-3 text-success" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div>
                                                <Link
                                                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                                                    className="wd-assignment-link text-decoration-none fs-5 text-dark"
                                                >
                                                    {assignment.title}
                                                </Link>
                                                <div className="fs-6">
                                                    <span className="text-danger">Multiple Modules</span>{" "}
                                                    | <b>Not available until</b>{" "}
                                                    {new Date(assignment.available).toLocaleDateString()}{" "}
                                                    at{" "}
                                                    {new Date(assignment.available).toLocaleTimeString()}{" "}
                                                    |
                                                </div>
                                                <div className="fs-6">
                                                    <b>Due</b>{" "}
                                                    {new Date(assignment.due).toLocaleDateString()} at{" "}
                                                    {new Date(assignment.due).toLocaleTimeString()} |
                                                    {assignment.points} pts
                                                </div>
                                            </div>
                                        </div>
                                        <AssignmentControlButtons
                                            assignmentName={assignment.title}
                                            deleteAssignment={() =>
                                                dispatch(deleteAssignment(assignment._id))
                                            }
                                        />
                                    </div>
                                </ListGroupItem>
                            ))}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}
