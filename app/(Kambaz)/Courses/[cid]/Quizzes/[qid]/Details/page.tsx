"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import { useState, useEffect } from "react";
import { Quiz, quizTypeLabels, quizGroupLabels } from "@/app/(Kambaz)/types";
import * as client from "../../client";
import { setQuizzes } from "../../reducer";
import { Button, Col, Row } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetails() {
    const { qid, cid } = useParams<{ qid: string; cid: string }>();
    const [quiz, setQuiz] = useState<Quiz>();
    const [loading, setLoading] = useState(true);

    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );

    const dispatch = useDispatch();
    const router = useRouter();

    const showControls =
        currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

    const handleTakeQuiz = () => {
        router.push(`/Courses/${cid}/Quizzes/${qid}`);
    };

    const handleEditQuiz = () => {
        router.push(`/Courses/${cid}/Quizzes/${qid}/Editor/Details`);
    };

    const boolToString = (bool: boolean | undefined | null) => {
        if (bool === true) {
            return "Yes";
        } else {
            return "No";
        }
    };

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            const quiz = await client.findQuizById(qid as string);
            setQuiz(quiz);
            const quizzes = await client.findQuizzesForCourse(cid as string);
            dispatch(setQuizzes(quizzes));

            setLoading(false);
        };
        fetchQuiz();
    }, [qid, cid]);

    if (loading) return <div>Loading...</div>;
    if (!quiz) {
        return null;
    }
    return (
        <div>
            {showControls && (
                <div className="d-flex justify-content-center gap-2">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="me-1"
                        id="wd-preview-quiz-btn"
                        onClick={handleTakeQuiz}
                    >
                        Preview
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="me-1"
                        id="wd-edit-quiz-btn"
                        onClick={handleEditQuiz}
                    >
                        <FaPencil className="text-secondary me-2 mb-1" />
                        Edit
                    </Button>
                </div>
            )}
            <div className="border border-2 px-3 py-1 m-3">
                <h2 className="mb-3">{quiz.title}</h2>
                <Row>
                    <Col sm="auto" className="text-end fw-bold">
                        <p>Quiz Type</p>
                        <p>Points</p>
                        <p>Assignment Group</p>
                        <p>Shuffle Answers</p>
                        <p>Time Limit</p>
                        <p>Multiple Attempts</p>
                        <p>Number of Attempts</p>
                        <p>Show Correct Answers</p>
                        <p>Access Code</p>
                        <p>One Question at a Time</p>
                        <p>Webcam Required</p>
                        <p>Lock Questions After Answering</p>
                    </Col>
                    <Col>
                        <p>{quizTypeLabels[quiz.type]}</p>
                        <p>{quiz.points}</p>
                        <p>{quizGroupLabels[quiz.group]}</p>
                        <p>{boolToString(quiz.shuffleAnswers)}</p>
                        <p>{quiz.timeLimit}</p>
                        <p>{boolToString(quiz.multipleAttempts)}</p>
                        <p>{quiz.attemptsAllowed}</p>
                        <p>
                            {quiz.showCorrectAnswers
                                ? formatDate(quiz.showCorrectAnswersDate)
                                : boolToString(quiz.showCorrectAnswers)}
                        </p>
                        <p>{quiz.accessCode || "None"}</p>
                        <p>{boolToString(quiz.oneQuestionAtATime)}</p>
                        <p>{boolToString(quiz.webcamRequired)}</p>
                        <p>{boolToString(quiz.lockQuestionsAfterAnswering ?? false)}</p>
                    </Col>
                </Row>
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>Due</th>
                            <th>Available from</th>
                            <th>Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{formatDate(quiz.due)}</td>
                            <td>{formatDate(quiz.available)}</td>
                            <td>{formatDate(quiz.until)}</td>
                        </tr>
                    </tbody>
                </table>
                {!showControls && (
                    <div className="d-flex justify-content-end my-3">
                        <Button
                            variant="danger"
                            size="lg"
                            className="me-1 float-end"
                            id="wd-preview-quiz-btn"
                            onClick={handleTakeQuiz}
                        >
                            Start
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
