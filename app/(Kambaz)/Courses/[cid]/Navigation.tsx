"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { courses } from "../../Database";

export default function CourseNavigation({
    course,
}: {
    course: { _id: string } | undefined;
}) {
    const pathname = usePathname();
    const links = [
        "Home",
        "Modules",
        "Piazza",
        "Zoom",
        "Assignments",
        "Quizzes",
        "Grades",
        "People",
    ];
    const cid = course?._id;
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    href={`/Courses/${cid}/${link}`}
                    id="wd-course-home-link"
                    className={
                        pathname.includes(link)
                            ? "list-group-item active border-0"
                            : "list-group-item text-danger border-0"
                    }
                >
                    {link}
                </Link>
            ))}
        </div>
    );
}
