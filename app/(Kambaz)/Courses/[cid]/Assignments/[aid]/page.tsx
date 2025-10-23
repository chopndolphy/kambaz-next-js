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
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import Link from "next/link";

const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
};

export default function AssignmentEditor() {
    const { aid, cid } = useParams();
    const assignments = db.assignments;
    const assignment = assignments.find((assignment) => assignment._id === aid);

    return (
        <div id="wd-assignments-editor" className="fs-6 m-1">
            <div className="py-3">
                <div className="mb-3">
                    <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
                    <FormControl id="wd-name" type="text" value={assignment?.title} />
                </div>
                <div className="mb-3">
                    <FormControl
                        as="textarea"
                        id="wd-description"
                        rows={10}
                        value={assignment?.description}
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
                                value={assignment?.points}
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
                                    <FormControl id="wd-assign-to" value={"Everyone"} />
                                </div>
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-due-date" className="fs-6">
                                        <b>Due</b>
                                    </FormLabel>
                                    <FormControl
                                        type="date"
                                        value={formatDate(assignment?.due)}
                                        id="wd-due-date"
                                    />
                                </div>
                                <Row className="d-flex">
                                    <Col className="mb-3">
                                        <FormLabel htmlFor="wd-due-date" className="fs-6">
                                            <b>Available from</b>
                                        </FormLabel>
                                        <FormControl
                                            type="date"
                                            value={formatDate(assignment?.available)}
                                            id="wd-available-from"
                                        />
                                    </Col>
                                    <Col className="mb-3">
                                        <FormLabel htmlFor="wd-due-date" className="fs-6">
                                            <b>Until</b>
                                        </FormLabel>
                                        <FormControl
                                            type="date"
                                            value={formatDate(assignment?.due)}
                                            id="wd-available-until"
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <hr />

            <Link href={`/Courses/${cid}/Assignments`}>
                <Button variant="danger" size="lg" className="me-1 float-end">
                    Save
                </Button>
            </Link>
            <Link href={`/Courses/${cid}/Assignments`}>
                <Button variant="secondary" size="lg" className="me-1 float-end">
                    Cancel
                </Button>
            </Link>
        </div>
    );
}
