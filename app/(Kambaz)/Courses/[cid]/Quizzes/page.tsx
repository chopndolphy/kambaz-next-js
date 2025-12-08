"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import * as client from "./client";
import Link from "next/link";
import { ListGroup, ListGroupItem, Row } from "react-bootstrap";
import QuizzesControls from "./QuizzesControls";
import QuizzesTitleControlButtons from "./QuizzesTitleControlButtons";
import QuizControlButtons from "./QuizControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBan } from "react-icons/fa";
import { RxRocket } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import { addQuiz, deleteQuiz, setQuizzes } from "./reducer";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Quiz } from "@/app/(Kambaz)/types";

export default function Quizzes() {
    const { cid } = useParams<{ cid: string }>();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const dispatch = useDispatch();

    const onRemoveQuiz = async (quizId: string) => {
        await client.deleteQuiz(quizId);
        dispatch(setQuizzes(quizzes.filter((q) => q._id !== quizId)));
    };

    const onUpdateQuiz = async (quiz: Quiz) => {
        await client.updateQuiz(quiz);
        const newQuizzes = quizzes.map((q) => (q._id === quiz._id ? quiz : q));
        dispatch(setQuizzes(newQuizzes));
    };
    const showControls =
        currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

    useEffect(() => {
        const fetchQuizzes = async () => {
            const quizzes = await client.findQuizzesForCourse(cid as string);
            if (!showControls) {
                const newQuizzes = quizzes.filter((q: Quiz) => q.published === true);
                dispatch(setQuizzes(newQuizzes));
            } else {
                dispatch(setQuizzes(quizzes));
            }
        };
        fetchQuizzes();
    }, [cid, dispatch, showControls]);

    if (!currentUser) {
        return;
    }

    const now = new Date();

    return (
        <div>
            <QuizzesControls showControls={showControls} />
            <br />
            <br />
            <br />
            <br />

            <ListGroup className="rounded-0" id="wd-quizzes">
                <ListGroupItem className="wd-quiz p-0 mb-5 fs-5 border-gray">
                    <div
                        className={
                            showControls
                                ? "wd-quizzes-title p-3 ps-2 bg-secondary"
                                : "wd-quizzes-title p-3 ps-3 bg-secondary"
                        }
                    >
                        {showControls && (
                            <>
                                <IoMdArrowDropdown className="me-1 fs-3" />
                            </>
                        )}
                        QUIZZES
                    </div>
                    <ListGroup id="wd-quizzes-list" className="rounded-0">
                        {quizzes.map((quiz, index) => (
                            <ListGroupItem
                                id={`wd-quiz-list-item-${quiz._id || index}`}
                                className={showControls ? "p-3 ps-1 wd-lesson" : "p-3 ps-3"}
                                key={quiz._id || `quiz-${index}`}
                            >
                                <div
                                    className={
                                        showControls
                                            ? "d-flex align-items-center"
                                            : "d-flex align-items-center"
                                    }
                                >
                                    {showControls && (
                                        <div>
                                            <RxRocket className="me-4 ms-3 fs-3 text-success" />
                                        </div>
                                    )}
                                    <div className="flex-grow-1">
                                        <div>
                                            <Link
                                                href={`/Courses/${cid}/Quizzes/${quiz._id}/Details`}
                                                className="wd-quiz-link text-decoration-none fs-4 text-dark"
                                            >
                                                {quiz.title}
                                            </Link>
                                            <div className="fs-6">
                                                <span className="fs-6">
                                                    {new Date(quiz.available) > now && (
                                                        <>
                                                            <b>Not available until</b>{" "}
                                                            {new Date(quiz.available).toLocaleDateString()} at{" "}
                                                            {new Date(quiz.available).toLocaleTimeString()}
                                                        </>
                                                    )}
                                                    {new Date(quiz.available) < now &&
                                                        new Date(quiz.until) > now && <b>Available</b>}
                                                    {new Date(quiz.until) < now && <b>Closed</b>}
                                                    {" | "}
                                                </span>
                                                <span className="fs-6">
                                                    <b>Due</b> {new Date(quiz.due).toLocaleDateString()}{" "}
                                                    at {new Date(quiz.due).toLocaleTimeString()} |{" "}
                                                    {quiz.points} pts {" | "}
                                                </span>
                                                <span>{quiz.questions?.length ?? 0} questions</span>
                                                {currentUser.role === "STUDENT" && (
                                                    <span>
                                                        {" | Score: "}
                                                        {currentUser.quizzesTaken.find(
                                                            (q) => quiz._id === q._id,
                                                        )?.score ?? "Not attempted"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {showControls && (
                                        <div className="d-flex align-item-center gap-0 ps-2">
                                            <button
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    padding: 0,
                                                    color: "inherit",
                                                }}
                                                onClick={() => {
                                                    onUpdateQuiz({ ...quiz, published: !quiz.published });
                                                }}
                                            >
                                                {quiz.published && <GreenCheckmark />}
                                                {!quiz.published && (
                                                    <FaBan className="text-danger me-1 fs-5" />
                                                )}
                                            </button>

                                            <QuizControlButtons
                                                quiz={quiz}
                                                togglePublished={() => {
                                                    onUpdateQuiz({ ...quiz, published: !quiz.published });
                                                }}
                                                deleteQuiz={() => {
                                                    onRemoveQuiz(quiz._id);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}
