"use client";
import { Nav, Row, Col } from "react-bootstrap";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import * as client from "../../client";
import { Quiz } from "@/app/(Kambaz)/types";
import { useState, useEffect } from "react";
import { FaBan } from "react-icons/fa";
import GreenCheckmark from "../../../Modules/GreenCheckmark";

export default function QuizEditorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { cid, qid } = useParams<{ cid: string; qid: string }>();
    const [quiz, setQuiz] = useState<Quiz>();
    const pathname = usePathname();
    const QUIZ_EDITOR = `/Courses/${cid}/Quizzes/${qid}/Editor`;
    useEffect(() => {
        const fetchQuiz = async () => {
            const quiz = await client.findQuizById(qid as string);
            setQuiz(quiz);
        };
        fetchQuiz();
    }, [qid]);

    if (!quiz) {
        return null;
    }

    return (
        <div>
            <Row className="justify-content-end align-items-center fs-4 me-2">
                <Col xs="auto">Points {quiz.points}</Col>
                {quiz.published && (
                    <Col xs="auto" className="text-success fs-5">
                        <GreenCheckmark /> Published
                    </Col>
                )}
                {!quiz.published && (
                    <Col xs="auto" className="text-secondary fs-5">
                        <FaBan className="text-secondary me-1 fs-5" /> Not Published
                    </Col>
                )}
            </Row>
            <Nav variant="tabs" activeKey={pathname}>
                <Nav.Item key="details">
                    <Nav.Link
                        as={Link}
                        href={`${QUIZ_EDITOR}/Details`}
                        eventKey={`${QUIZ_EDITOR}/Details`}
                        className={
                            pathname === `${QUIZ_EDITOR}/Details`
                                ? "text-black"
                                : "text-danger"
                        }
                    >
                        Details
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item key="questions">
                    <Nav.Link
                        as={Link}
                        href={`${QUIZ_EDITOR}/Questions`}
                        eventKey={`${QUIZ_EDITOR}/Questions`}
                        className={
                            pathname === `${QUIZ_EDITOR}/Questions`
                                ? "text-black"
                                : "text-danger"
                        }
                    >
                        Questions
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="mt-3">{children}</div>
        </div>
    );
}
