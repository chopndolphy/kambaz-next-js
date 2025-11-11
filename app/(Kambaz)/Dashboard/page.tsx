"use client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import Image from "next/image";
import { Course } from "../Database";
import {
    Row,
    Col,
    Button,
    Card,
    CardImg,
    CardText,
    CardTitle,
    CardBody,
    FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { RootState } from "../store";

export default function Dashboard() {
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const { enrollments } = useSelector(
        (state: RootState) => state.enrollmentsReducer,
    );
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const dispatch = useDispatch();
    const [course, setCourse] = useState<Course>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        department: "Default Department",
        credits: 0,
        image: "/images/reactjs.jpg",
        description: "New Description",
    });

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h5>
                New Course
                <Button
                    variant="primary"
                    className="float-end"
                    id="wd-add-new-course-click"
                    onClick={() => dispatch(addNewCourse(course))}
                >
                    {" "}
                    Add{" "}
                </Button>
                <Button
                    variant="warning"
                    className="me-2 float-end"
                    id="wd-update-course-click"
                    onClick={() => dispatch(updateCourse(course))}
                >
                    {" "}
                    Update{" "}
                </Button>
            </h5>
            <br />
            <FormControl
                value={course.name}
                className="mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <FormControl
                as="textarea"
                value={course.description}
                rows={3}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
            />
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses
                        .filter((course) =>
                            enrollments.some(
                                (enrollment) =>
                                    enrollment.user === currentUser?._id &&
                                    enrollment.course === course._id,
                            ),
                        )
                        .map((course: Course) => (
                            <Col
                                className="wd-dashboard-course"
                                style={{ width: "300px" }}
                                key={course._id}
                            >
                                <Card>
                                    <Link
                                        href={`/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark"
                                    >
                                        <CardImg
                                            variant="top"
                                            src={course.image}
                                            width="100%"
                                            height={160}
                                            alt="ReactJS"
                                        />
                                        <CardBody>
                                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                                {course.name}
                                            </CardTitle>
                                            <CardText
                                                className="wd-dashboard-course-description overflow-hidden"
                                                style={{ height: "100px" }}
                                            >
                                                {course.description}
                                            </CardText>
                                            <Button variant="primary">Go</Button>
                                            <Button
                                                variant="danger"
                                                id="wd-delete-course-click"
                                                className="float-end"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(deleteCourse(course._id));
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="warning"
                                                id="wd-edit-course-click"
                                                className="me-2 float-end"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </CardBody>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
}
