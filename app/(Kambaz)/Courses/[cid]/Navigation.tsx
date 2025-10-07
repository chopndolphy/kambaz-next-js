"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
    const pathname = usePathname();
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            <Link
                href="/Courses/1234/Home"
                id="wd-course-home-link"
                className={
                    pathname === "/Courses/1234/Home"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Home
            </Link>
            <Link
                href="/Courses/1234/Modules"
                id="wd-course-modules-link"
                className={
                    pathname === "/Courses/1234/Modules"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Modules
            </Link>
            <Link
                href="/Courses/1234/Piazza"
                id="wd-course-piazza-link"
                className={
                    pathname === "/Courses/1234/Piazza"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Piazza
            </Link>
            <Link
                href="/Courses/1234/Zoom"
                id="wd-course-zoom-link"
                className={
                    pathname === "/Courses/1234/Zoom"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Zoom
            </Link>
            <Link
                href="/Courses/1234/Assignments"
                id="wd-course-assignments-link"
                className={
                    pathname.startsWith("/Courses/1234/Assignments")
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Assignments
            </Link>
            <Link
                href="/Courses/1234/Quizzes"
                id="wd-course-quizzes-link"
                className={
                    pathname === "/Courses/1234/Quizzes"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Quizzes
            </Link>
            <Link
                href="/Courses/1234/Grades"
                id="wd-course-grades-link"
                className={
                    pathname === "/Courses/1234/Grades"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Grades
            </Link>
            <Link
                href="/Courses/1234/People/Table"
                id="wd-course-people-link"
                className={
                    pathname === "/Courses/1234/People/Table"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                People
            </Link>
        </div>
    );
}
