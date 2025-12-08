"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function QuizEditor() {
    const { cid, qid } = useParams<{ cid: string; qid: string }>();
    const router = useRouter();

    useEffect(() => {
        router.replace(`/Courses/${cid}/Quizzes/${qid}/Editor/Details`);
    }, [cid, qid, router]);

    return null;
}
