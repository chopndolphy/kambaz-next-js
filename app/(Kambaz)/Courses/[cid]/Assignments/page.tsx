import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentsTitleControlButtons from "./AssignmentsTitleControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiNotePencil } from "react-icons/pi";

export default function Assignments() {
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
                        <ListGroupItem
                            id="wd-assignment-list-item"
                            className="p-3 ps-1 wd-lesson"
                        >
                            <div className="d-flex align-items-center">
                                <div>
                                    <BsGripVertical className="me-2 fs-3" />
                                    <PiNotePencil className="me-4 fs-3 text-success" />
                                </div>
                                <div className="flex-grow-1">
                                    <div>
                                        <Link
                                            href="/Courses/1234/Assignments/123"
                                            className="wd-assignment-link text-decoration-none fs-5 text-dark"
                                        >
                                            A1 - ENV + HTML
                                        </Link>
                                        <div className="fs-6">
                                            <span className="text-danger">Multiple Modules</span> |{" "}
                                            <b>Not available until</b> May 6 at 12:00am |
                                        </div>
                                        <div className="fs-6">
                                            <b>Due</b> May 13 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                </div>
                                <AssignmentControlButtons />
                            </div>
                        </ListGroupItem>
                        <ListGroupItem
                            id="wd-assignment-list-item"
                            className="p-3 ps-1 wd-lesson"
                        >
                            <div className="d-flex align-items-center">
                                <div>
                                    <BsGripVertical className="me-2 fs-3" />
                                    <PiNotePencil className="me-4 fs-3 text-success" />
                                </div>
                                <div className="flex-grow-1">
                                    <div>
                                        <Link
                                            href="/Courses/1234/Assignments/123"
                                            className="wd-assignment-link text-decoration-none fs-5 text-dark"
                                        >
                                            A2 - CSS + BOOTSTRAP
                                        </Link>
                                        <div className="fs-6">
                                            <span className="text-danger">Multiple Modules</span> |{" "}
                                            <b>Not available until</b> May 13 at 12:00am |
                                        </div>
                                        <div className="fs-6">
                                            <b>Due</b> May 20 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                </div>
                                <AssignmentControlButtons />
                            </div>
                        </ListGroupItem>
                        <ListGroupItem
                            id="wd-assignment-list-item"
                            className="p-3 ps-1 wd-lesson"
                        >
                            <div className="d-flex align-items-center">
                                <div>
                                    <BsGripVertical className="me-2 fs-3" />
                                    <PiNotePencil className="me-4 fs-3 text-success" />
                                </div>
                                <div className="flex-grow-1">
                                    <div>
                                        <Link
                                            href="/Courses/1234/Assignments/123"
                                            className="wd-assignment-link text-decoration-none fs-5 text-dark"
                                        >
                                            A3 - JAVASCRIPT + REACT
                                        </Link>
                                        <div className="fs-6">
                                            <span className="text-danger">Multiple Modules</span> |{" "}
                                            <b>Not available until</b> May 20 at 12:00am |
                                        </div>
                                        <div className="fs-6">
                                            <b>Due</b> May 27 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                </div>
                                <AssignmentControlButtons />
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}
