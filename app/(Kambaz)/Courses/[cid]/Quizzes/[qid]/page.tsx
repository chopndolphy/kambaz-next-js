"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import { Button, FormCheck, FormControl, Alert } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { Quiz } from "@/app/(Kambaz)/types";
import * as quizClient from "../client";

export default function QuizTakingPage() {
    const { qid, cid } = useParams<{ qid: string; cid: string }>();
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const router = useRouter();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const isFaculty =
        currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
    const isPreview = isFaculty;

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!qid) return;
            const fetchedQuiz = await quizClient.findQuizById(qid);
            setQuiz(fetchedQuiz);
            setLoading(false);
        };
        fetchQuiz();
    }, [qid, isFaculty]);

    if (loading || !quiz || !currentUser) {
        return <div>Loading...</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div className="m-3">
            <div className="mb-3">
                <h2>{quiz.title}</h2>
                {isPreview && (
                    <Alert variant="danger" className="mb-3">
                        This is a preview of the published version of the quiz
                    </Alert>
                )}
            </div>

            {quiz.description && (
                <div className="mb-4">
                    <h5>Quiz Instructions</h5>
                    <p>{quiz.description}</p>
                </div>
            )}

            {isFaculty && (
                <div className="mb-3">
                    <Button
                        variant="secondary"
                        onClick={() =>
                            router.push(`/Courses/${cid}/Quizzes/${qid}/Editor/Questions`)
                        }
                    >
                        <FaPencil className="me-2" />
                        Keep Editing This Quiz
                    </Button>
                </div>
            )}

            <div className="d-flex gap-4">
                <div className="flex-grow-1">
                    {currentQuestion && (
                        <div className="border rounded p-4 mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5>Question {currentQuestionIndex + 1}</h5>
                                <span className="text-secondary">
                                    {currentQuestion.points} pts
                                </span>
                            </div>

                            <div className="mb-4">
                                <p>{currentQuestion.question}</p>
                            </div>

                            <div>
                                {currentQuestion.type === "MULTIPLE_CHOICE" && (
                                    <div>
                                        {currentQuestion.multipleChoiceOptions?.map(
                                            (option, idx) => (
                                                <FormCheck
                                                    key={idx}
                                                    type="radio"
                                                    name={`question-${currentQuestion._id}`}
                                                    id={`option-${idx}`}
                                                    label={option}
                                                    className="mb-2"
                                                />
                                            ),
                                        )}
                                    </div>
                                )}

                                {currentQuestion.type === "TRUE_FALSE" && (
                                    <div>
                                        <FormCheck
                                            type="radio"
                                            name={`question-${currentQuestion._id}`}
                                            id="true"
                                            label="True"
                                            className="mb-2"
                                        />
                                        <FormCheck
                                            type="radio"
                                            name={`question-${currentQuestion._id}`}
                                            id="false"
                                            label="False"
                                            className="mb-2"
                                        />
                                    </div>
                                )}

                                {currentQuestion.type === "FILL_IN_THE_BLANK" && (
                                    <FormControl type="text" placeholder="Enter your answer" />
                                )}
                            </div>

                            <div className="d-flex justify-content-end mt-4">
                                {!quiz.oneQuestionAtATime && currentQuestionIndex > 0 && (
                                    <Button
                                        variant="secondary"
                                        onClick={handlePrevious}
                                        className="me-2"
                                    >
                                        ← Previous
                                    </Button>
                                )}
                                {currentQuestionIndex < totalQuestions - 1 && (
                                    <Button variant="danger" onClick={handleNext}>
                                        Next ▸
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                    {!quiz.oneQuestionAtATime &&
                        currentQuestionIndex === totalQuestions - 1 && (
                            <div className="d-flex justify-content-end">
                                <Button variant="danger" size="lg">
                                    Submit Quiz
                                </Button>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
