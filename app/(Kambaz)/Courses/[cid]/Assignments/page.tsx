"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import * as client from "./client";
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
import { addAssignment, deleteAssignment, setAssignments } from "./reducer";

export default function Assignments() {
    const { cid } = useParams<{ cid: string }>();
    const { assignments } = useSelector(
        (state: RootState) => state.assignmentsReducer,
    );
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAssignments = async () => {
            const assignments = await client.findAssignmentsForCourse(cid as string);
            dispatch(setAssignments(assignments));
        };
        fetchAssignments();
    }, [cid, dispatch]);
    const onRemoveAssignment = async (assignmentId: string) => {
        await client.deleteAssignment(assignmentId);
        dispatch(setAssignments(assignments.filter((a) => a._id !== assignmentId)));
    };

    if (!currentUser) {
        return;
    }

    const showControls =
        currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

    return (
        <div>
            <AssignmentsControls showControls={showControls} />
            <br />
            <br />
            <br />
            <br />

            <ListGroup className="rounded-0" id="wd-assignments">
                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div
                        className={
                            showControls
                                ? "wd-assignments-title p-3 ps-2 bg-secondary"
                                : "wd-assignments-title p-3 ps-3 bg-secondary"
                        }
                    >
                        {showControls && (
                            <>
                                <BsGripVertical className="me-0 fs-3" />
                                <IoMdArrowDropdown className="me-0 fs-3" />
                            </>
                        )}
                        ASSIGNMENTS
                        {showControls && <AssignmentsTitleControlButtons />}
                    </div>
                    <ListGroup id="wd-assignment-list" className="rounded-0">
                        {assignments.map((assignment, index) => (
                            <ListGroupItem
                                id={`wd-assignment-list-item-${assignment._id || index}`}
                                className={showControls ? "p-3 ps-1 wd-lesson" : "p-3 ps-3"}
                                key={assignment._id || `assignment-${index}`}
                            >
                                <div
                                    className={
                                        showControls
                                            ? "d-flex align-items-center"
                                            : "d-flex align-items-center"
                                    }
                                >
                                    {showControls && (
                                        <div>
                                            <BsGripVertical className="me-2 fs-3" />
                                            <PiNotePencil className="me-4 fs-3 text-success" />
                                        </div>
                                    )}
                                    <div className="flex-grow-1">
                                        <div>
                                            {showControls && (
                                                <Link
                                                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                                                    className="wd-assignment-link text-decoration-none fs-5 text-dark"
                                                >
                                                    {assignment.title}
                                                </Link>
                                            )}
                                            {!showControls && (
                                                <div className="wd-assignment-link text-decoration-none fs-5 text-dark">
                                                    {assignment.title}
                                                </div>
                                            )}
                                            <div className="fs-6">
                                                <span className="text-danger">Multiple Modules</span> |{" "}
                                                <b>Not available until</b>{" "}
                                                {new Date(assignment.available).toLocaleDateString()} at{" "}
                                                {new Date(assignment.available).toLocaleTimeString()} |
                                            </div>
                                            <div className="fs-6">
                                                <b>Due</b>{" "}
                                                {new Date(assignment.due).toLocaleDateString()} at{" "}
                                                {new Date(assignment.due).toLocaleTimeString()} |
                                                {assignment.points} pts
                                            </div>
                                        </div>
                                    </div>
                                    {showControls && (
                                        <AssignmentControlButtons
                                            assignmentName={assignment.title}
                                            deleteAssignment={() => {
                                                onRemoveAssignment(assignment._id);
                                            }}
                                        />
                                    )}
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}
