"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Course, Assignment } from "../../Database";

export default function Breadcrumb({
    course,
    assignments,
}: {
    course: Course | undefined;
    assignments: Assignment[];
}) {
    const pathname = usePathname();
    const breadcrumbs = pathname.split("/");
    breadcrumbs.shift();
    breadcrumbs.shift();
    breadcrumbs.shift();
    if (breadcrumbs[0] === "Assignments" && breadcrumbs.length > 1) {
        if (breadcrumbs[1] === "new") {
            breadcrumbs[1] = "Create Assignment";
        } else {
            const a = assignments.find(
                (assignment: Assignment) => assignment._id === breadcrumbs[1],
            );
            breadcrumbs[1] = a?.title ?? "";
        }
    }

    const courseName = course?.name;
    return (
        <span>
            {courseName}
            {breadcrumbs.map((crumb) => (
                <span key={crumb}> &gt; {crumb}</span>
            ))}
        </span>
    );
}
