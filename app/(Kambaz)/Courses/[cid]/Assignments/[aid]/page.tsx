"use client";
import {
    FormControl,
    FormLabel,
    FormSelect,
    FormCheck,
    InputGroup,
    Button,
} from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { RootState } from "@/app/(Kambaz)/store";
import { useSelector, useDispatch } from "react-redux";
import { Assignment } from "../../../../Database";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addAssignment, updateAssignment, setAssignments } from "../reducer";
import * as client from "../client";

const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
};

export default function AssignmentEditor() {
    const { aid, cid } = useParams<{ aid: string; cid: string }>();
    const { assignments } = useSelector(
        (state: RootState) => state.assignmentsReducer,
    );
    const dispatch = useDispatch();
    const router = useRouter();
    const getAssignment = (): Assignment => {
        const a = assignments.find(
            (assignment: Assignment) => assignment._id === aid,
        );
        return a
            ? a
            : {
                _id: uuidv4(),
                course: cid,
                title: "",
                description: "",
                points: 0,
                available: "2025-10-31T23:59:00",
                due: "2025-11-07T23:59:00",
                until: "2025-11-07T23:59:00",
            };
    };
    const [assignment, setAssignment] = useState<Assignment>(getAssignment());

    const onCreateAssignmentForCourse = async () => {
        const createdAssignment = await client.createAssignmentForCourse(cid, assignment);
        dispatch(setAssignments([...assignments, createdAssignment]));
    };
    const onUpdateAssignment = async (assignment: Assignment) => {
        await client.updateAssignment(assignment);
        const newAssignments = assignments.map((a) => a._id === assignment._id ? assignment : a);
        dispatch(setAssignments(newAssignments));
    };

    return (
        <div id="wd-assignments-editor" className="fs-6 m-1">
            <div className="py-3">
                <div className="mb-3">
                    <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
                    <FormControl
                        id="wd-name"
                        type="text"
                        value={assignment.title}
                        onChange={(e) => {
                            setAssignment({ ...assignment, title: e.target.value });
                        }}
                    />
                </div>
                <div className="mb-3">
                    <FormControl
                        as="textarea"
                        id="wd-description"
                        rows={10}
                        value={assignment.description}
                        onChange={(e) => {
                            setAssignment({ ...assignment, description: e.target.value });
                        }}
                    ></FormControl>
                </div>
                <div className="m-2">
                    <Row className="mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1">
                            <FormLabel htmlFor="wd-points">Points</FormLabel>
                        </Col>
                        <Col sm={8}>
                            <FormControl
                                id="wd-points"
                                type="number"
                                value={assignment.points}
                                onChange={(e) => {
                                    setAssignment({
                                        ...assignment,
                                        points: parseInt(e.target.value, 10) || 0,
                                    });
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1">
                            <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
                        </Col>
                        <Col sm={8}>
                            <FormSelect id="wd-group">
                                <option value="ASSIGNMENTS" defaultChecked>
                                    ASSIGNMENTS
                                </option>
                                <option value="QUIZZES">QUIZZES</option>
                                <option value="EXAMS"> EXAMS </option>
                                <option value="PROJECT">PROJECT</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1">
                            <FormLabel htmlFor="wd-display-grade-as">
                                Display Grade as
                            </FormLabel>
                        </Col>
                        <Col sm={8}>
                            <FormSelect id="wd-display-grade-as">
                                <option defaultChecked value="Percentage">
                                    Percentage
                                </option>
                                <option value="Fraction">Fraction</option>
                                <option value="Integer">Integer</option>
                                <option value="Letter">Letter</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1">
                            <FormLabel htmlFor="wd-submission-type">
                                Submission Type
                            </FormLabel>
                        </Col>
                        <Col sm={8}>
                            <div className="border rounded p-3">
                                <FormSelect id="wd-submission-type" className="mb-3">
                                    <option defaultChecked value="Online">
                                        Online
                                    </option>
                                    <option value="In-Person">In-Person</option>
                                    <option value="Letter">Letter</option>
                                    <option value="None">None</option>
                                </FormSelect>
                                <div className="m-1 fs-6">
                                    <div className="mb-3">
                                        <b>Online Entry Options</b>
                                    </div>
                                    <FormCheck
                                        className="mb-3"
                                        type="checkbox"
                                        defaultChecked={false}
                                        label="Text Entry"
                                    />
                                    <FormCheck
                                        className="mb-3"
                                        type="checkbox"
                                        defaultChecked={true}
                                        label="Website URL"
                                    />
                                    <FormCheck
                                        className="mb-3"
                                        type="checkbox"
                                        defaultChecked={false}
                                        label="Media Recordings"
                                    />
                                    <FormCheck
                                        className="mb-3"
                                        type="checkbox"
                                        defaultChecked={false}
                                        label="Student Annotation"
                                    />
                                    <FormCheck
                                        className="mb-3"
                                        type="checkbox"
                                        defaultChecked={false}
                                        label="File Uploads"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1">
                            <FormLabel htmlFor="wd-submission-type">Assign</FormLabel>
                        </Col>
                        <Col sm={8}>
                            <div className="border rounded px-3 pb-3 pt-2">
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-assign-to" className="fs-6 pt-1">
                                        <b>Assign to</b>
                                    </FormLabel>
                                    <FormControl id="wd-assign-to" defaultValue={"Everyone"} />
                                </div>
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-due-date" className="fs-6">
                                        <b>Due</b>
                                    </FormLabel>
                                    <FormControl
                                        type="date"
                                        value={formatDate(assignment.due)}
                                        id="wd-due-date"
                                        onChange={(e) => {
                                            setAssignment({ ...assignment, due: e.target.value });
                                        }}
                                    />
                                </div>
                                <Row className="d-flex">
                                    <Col className="mb-3">
                                        <FormLabel htmlFor="wd-due-date" className="fs-6">
                                            <b>Available from</b>
                                        </FormLabel>
                                        <FormControl
                                            type="date"
                                            value={formatDate(assignment.available)}
                                            id="wd-available-from"
                                            onChange={(e) => {
                                                setAssignment({
                                                    ...assignment,
                                                    available: e.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col className="mb-3">
                                        <FormLabel htmlFor="wd-due-date" className="fs-6">
                                            <b>Until</b>
                                        </FormLabel>
                                        <FormControl
                                            type="date"
                                            value={formatDate(assignment.until)}
                                            id="wd-available-until"
                                            onChange={(e) => {
                                                setAssignment({
                                                    ...assignment,
                                                    until: e.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <hr />

            <Button
                variant="danger"
                size="lg"
                className="me-1 float-end"
                onClick={() => {
                    if (aid === "new") {
                        onCreateAssignmentForCourse();
                    } else {
                        onUpdateAssignment(assignment);
                    }
                    router.back();
                }}
            >
                Save
            </Button>
            <Button
                variant="secondary"
                size="lg"
                className="me-1 float-end"
                onClick={() => router.back()}
            >
                Cancel
            </Button>
        </div>
    );
}
