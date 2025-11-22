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
import * as enrollmentsClient from "../../Dashboard/client";

export default function CoursesLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { cid } = useParams<{ cid: string }>();
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { assignments } = useSelector(
        (state: RootState) => state.assignmentsReducer,
    );
    const course = courses.find((course) => course._id === cid);
    const [enableBreadcrumb, setEnableBreadcrumb] = useState(true);
    const [enrollmentsLoaded, setEnrollmentsLoaded] = useState(false);

    // Fetch enrollments if not already loaded
    useEffect(() => {
        const fetchEnrollments = async () => {
            if (!currentUser || enrollmentsLoaded) return;
            try {
                const fetchedEnrollments = await enrollmentsClient.findEnrollmentsForCurrentUser();
                dispatch(setEnrollments(fetchedEnrollments));
                setEnrollmentsLoaded(true);
            } catch (error) {
                console.error("Failed to fetch enrollments:", error);
                setEnrollmentsLoaded(true); // Set to true even on error to prevent infinite loading
            }
        };
        fetchEnrollments();
    }, [currentUser, dispatch, enrollmentsLoaded]);

    const enrolled = enrollments.some((enrollment) =>
        enrollment.user === currentUser?._id &&
        enrollment.course === course?._id);

    // Only redirect if we've loaded enrollments and user is not enrolled
    useEffect(() => {
        if (enrollmentsLoaded && currentUser && !enrolled) {
            router.push("/Dashboard");
        }
    }, [enrolled, currentUser, router, enrollmentsLoaded]);

    // Show loading state while checking enrollment
    if (!enrollmentsLoaded || !currentUser) {
        return null; // or return a loading spinner
    }

    if (!enrolled) {
        return null;
    }

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
