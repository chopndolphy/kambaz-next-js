import {
    FormControl,
    FormLabel,
    FormSelect,
    FormCheck,
    InputGroup,
    Button,
} from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="fs-6 m-1">
            <div className="py-3">
                <div className="mb-3">
                    <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
                    <FormControl id="wd-name" type="text" value="A1 - ENV + HTML" />
                </div>
                <div className="mb-3">
                    <FormControl
                        as="textarea"
                        id="wd-description"
                        rows={10}
                        value="The assignment is available online Submit a link to the landing page
                        of"
                    ></FormControl>
                </div>
                <div className="m-2">
                    <Row className="mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1">
                            <FormLabel htmlFor="wd-points">Points</FormLabel>
                        </Col>
                        <Col sm={8}>
                            <FormControl id="wd-points" type="number" value={100} />
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
                                        value="2024-05-13"
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
                                            value="2024-05-06"
                                            id="wd-available-from"
                                        />
                                    </Col>
                                    <Col className="mb-3">
                                        <FormLabel htmlFor="wd-due-date" className="fs-6">
                                            <b>Until</b>
                                        </FormLabel>
                                        <FormControl
                                            type="date"
                                            value="2024-05-20"
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

            <Button variant="danger" size="lg" className="me-1 float-end">
                Save
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end">
                Cancel
            </Button>
        </div>
    );
}
