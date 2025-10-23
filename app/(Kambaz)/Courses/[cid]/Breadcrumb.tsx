"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({
    course,
}: {
    course: { name: string } | undefined;
}) {
    const pathname = usePathname();
    const breadcrumbs = pathname.split("/");
    breadcrumbs.shift();
    breadcrumbs.shift();
    breadcrumbs.shift();
    const courseName = course?.name;
    return (
        <span>
            {courseName}
            {breadcrumbs.map((crumb) => (
                <> &gt; {crumb}</>
            ))}
        </span>
    );
}
