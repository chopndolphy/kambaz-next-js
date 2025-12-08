"use client";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as client from "../Courses/client";
import Image from "next/image";
import { Course, User } from "../types";
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
import {
    addNewCourse,
    deleteCourse,
    updateCourse,
    setCourses,
} from "../Courses/reducer";
import {
    addEnrollment,
    deleteEnrollment,
    setEnrollments,
} from "./enrollments-reducer";
import { RootState } from "../store";
import { current } from "@reduxjs/toolkit";

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
    const [showEnrollments, setShowEnrollments] = useState(false);
    const onEnrollUserInCourse = async (courseId: string, user: User) => {
        await client.enrollIntoCourse(user._id, courseId);
        const enrollments = await client.findMyCourses();
        dispatch(setEnrollments(enrollments));
    };
    const onRemoveEnrollment = async (userId: string, courseId: string) => {
        await client.unenrollFromCourse(userId, courseId);
        const enrollments = await client.findMyCourses();
        dispatch(setEnrollments(enrollments));
    };
    const onAddNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        dispatch(setCourses([...courses, newCourse]));
    };
    const onDeleteCourse = async (courseId: string) => {
        const status = await client.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    };
    const onUpdateCourse = async () => {
        await client.updateCourse(course);
        dispatch(
            setCourses(
                courses.map((c) => {
                    if (c._id === course._id) {
                        return course;
                    } else {
                        return c;
                    }
                }),
            ),
        );
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                if (showEnrollments) {
                    const allCourses = await client.fetchAllCourses();
                    dispatch(setCourses(allCourses));
                } else {
                    const courses = await client.findMyCourses();
                    dispatch(setCourses(courses));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, [dispatch, currentUser, showEnrollments]);

    useEffect(() => {
        const fetchEnrollments = async () => {
            if (!currentUser) return;
            try {
                const enrollments = await client.findMyCourses();
                dispatch(setEnrollments(enrollments));
            } catch (error) {
                console.error(error);
            }
        };
        fetchEnrollments();
    }, [dispatch, currentUser]);

    const RenderButtons = ({ course }: { course: Course }) => {
        if (showEnrollments) {
            if (!currentUser) {
                return null;
            }
            const enrolled = enrollments.some(
                (enrollment) => enrollment._id === course._id,
            );
            return (
                <>
                    <Button
                        variant={enrolled ? "danger" : "success"}
                        className="float-start mb-3"
                        onClick={(event) => {
                            event.preventDefault();
                            if (enrolled) {
                                onRemoveEnrollment(currentUser._id, course._id);
                            } else {
                                onEnrollUserInCourse(course._id, currentUser);
                            }
                        }}
                    >
                        {enrolled ? "Unenroll" : "Enroll"}
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    <Button variant="primary">Go</Button>
                    {(currentUser?.role === "FACULTY" ||
                        currentUser?.role === "ADMIN") && (
                            <>
                                <Button
                                    variant="danger"
                                    id="wd-delete-course-click"
                                    className="float-end"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onDeleteCourse(course._id);
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
                            </>
                        )}
                </>
            );
        }
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            {currentUser?.role === "FACULTY" ||
                (currentUser?.role === "ADMIN" && (
                    <>
                        <h5>
                            New Course
                            <Button
                                variant="primary"
                                className="float-end"
                                id="wd-add-new-course-click"
                                onClick={onAddNewCourse}
                            >
                                {" "}
                                Add{" "}
                            </Button>
                            <Button
                                variant="warning"
                                className="me-2 float-end"
                                id="wd-update-course-click"
                                onClick={onUpdateCourse}
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
                            onChange={(e) =>
                                setCourse({ ...course, description: e.target.value })
                            }
                        />
                        <hr />
                    </>
                ))}
            ;
            <h2 id="wd-dashboard-published">
                Published Courses ({courses.length}){" "}
                <Button
                    variant="primary"
                    className="me-2 float-end"
                    onClick={() => setShowEnrollments(!showEnrollments)}
                >
                    {showEnrollments ? "My Courses" : "All Courses"}
                </Button>
            </h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course: Course) => (
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
                                        <RenderButtons course={course} />
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
