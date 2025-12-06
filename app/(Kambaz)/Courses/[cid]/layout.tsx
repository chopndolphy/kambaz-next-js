"use client";
import { ReactNode, useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { RootState } from "../../store";
import { useRouter } from "next/navigation";
import { setEnrollments } from "../../Dashboard/enrollments-reducer";
import { setCourses } from "../reducer";
import * as client from "../client";

export default function CoursesLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { cid } = useParams<{ cid: string }>();
    const { enrollments } = useSelector(
        (state: RootState) => state.enrollmentsReducer,
    );
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { assignments } = useSelector(
        (state: RootState) => state.assignmentsReducer,
    );
    const course = courses.find((course) => course._id === cid);
    const [enableBreadcrumb, setEnableBreadcrumb] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            if (!cid) return;
            const fetchedCourse = await client.findCourseById(cid);
            dispatch(setCourses([fetchedCourse])); // Add to courses array
        };

        fetchCourse();
    }, [cid, dispatch]);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <button
                    onClick={() => {
                        setEnableBreadcrumb(!enableBreadcrumb);
                    }}
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        color: "inherit",
                    }}
                >
                    <FaAlignJustify className="me-4 fs-4 mb-1" />
                </button>
                {enableBreadcrumb ? (
                    <Breadcrumb course={course} assignments={assignments} />
                ) : null}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation course={course}></CourseNavigation>
                </div>
                <div className="flex-fill">{children} </div>
            </div>
        </div>
    );
}
