"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Course } from "../../types";
import * as quizClient from "./Quizzes/client";
import * as assignmentClient from "./Assignments/client";

const titleCache: { [key: string]: string } = {};

export default function Breadcrumb({ course }: { course: Course | undefined }) {
    const pathname = usePathname();
    const [titles, setTitles] = useState<{ [key: string]: string }>(titleCache);

    const breadcrumbs = pathname.split("/");
    breadcrumbs.shift();
    breadcrumbs.shift();
    const cid = breadcrumbs.shift();

    useEffect(() => {
        const fetchData = async () => {
            if (breadcrumbs[0] === "Assignments" && breadcrumbs.length > 1) {
                const aid = breadcrumbs[1];
                if (aid !== "new" && !titleCache[aid]) {
                    try {
                        const assignment = await assignmentClient.findAssignmentById(aid);
                        if (assignment && assignment.title) {
                            titleCache[aid] = assignment.title;
                            setTitles({ ...titleCache });
                        }
                    } catch (error) {
                        console.error("Error fetching assignment:", error);
                    }
                }
            }

            if (breadcrumbs[0] === "Quizzes" && breadcrumbs.length > 1) {
                const qid = breadcrumbs[1];
                if (qid !== "new" && !titleCache[qid]) {
                    try {
                        const quiz = await quizClient.findQuizById(qid);
                        if (quiz && quiz.title) {
                            titleCache[qid] = quiz.title;
                            setTitles({ ...titleCache });
                        }
                    } catch (error) {
                        console.error("Error fetching quiz:", error);
                    }
                }
            }
        };

        fetchData();
    }, [pathname]);

    if (breadcrumbs[0] === "Assignments" && breadcrumbs.length > 1) {
        const aid = breadcrumbs[1];
        if (aid === "new") {
            breadcrumbs[1] = "Create Assignment";
        } else if (titles[aid]) {
            breadcrumbs[1] = titles[aid];
        }
    }

    if (breadcrumbs[0] === "Quizzes" && breadcrumbs.length > 1) {
        const qid = breadcrumbs[1];
        if (qid === "new") {
            breadcrumbs[1] = "New Quiz";
        } else if (titles[qid]) {
            breadcrumbs[1] = titles[qid];
        }
        // Remove trailing segments
        if (breadcrumbs[2] === "Editor") {
            breadcrumbs.pop();
        }
        if (breadcrumbs.length > 2) {
            breadcrumbs.pop();
        }
    }

    const courseName = course?.name;

    return (
        <span>
            {courseName}
            {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb}-${index}`}> &gt; {crumb}</span>
            ))}
        </span>
    );
}
