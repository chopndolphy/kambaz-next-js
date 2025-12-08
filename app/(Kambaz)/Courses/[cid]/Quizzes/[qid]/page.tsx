"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import {
    Button,
    FormCheck,
    FormControl,
    Alert,
    ListGroup,
    ListGroupItem,
} from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
    Quiz,
    Question,
    QuizSubmission,
    QuizAnswerSubmission,
    questionTypeLabels,
} from "@/app/(Kambaz)/types";
import * as quizClient from "../client";
import * as userClient from "@/app/(Kambaz)/Account/client";
import { setCurrentUser } from "@/app/(Kambaz)/Account/reducer";

export default function QuizTakingPage() {
    const { qid, cid } = useParams<{ qid: string; cid: string }>();
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const dispatch = useDispatch();
    const router = useRouter();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, QuizAnswerSubmission>>(
        {},
    );
    const [submitted, setSubmitted] = useState(false);
    const [submission, setSubmission] = useState<QuizSubmission | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);

    const isFaculty =
        currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
    const isPreview = isFaculty;
    const quizSubmission = currentUser?.quizzesTaken?.find(
        (s: QuizSubmission) => s._id === qid,
    );

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!qid) return;
            const fetchedQuiz = await quizClient.findQuizById(qid);
            setQuiz(fetchedQuiz);
            setLoading(false);
            setStartTime(new Date());

            if (!isFaculty && quizSubmission) {
                const attemptsUsed = quizSubmission.attemptsUsed || 0;
                const canTakeAgain =
                    fetchedQuiz.multipleAttempts &&
                    attemptsUsed < fetchedQuiz.attemptsAllowed;

                if (!canTakeAgain) {
                    const submissionAnswers: Record<string, QuizAnswerSubmission> = {};
                    quizSubmission.answers.forEach((ans: QuizAnswerSubmission) => {
                        submissionAnswers[ans._id] = ans;
                    });
                    setAnswers(submissionAnswers);
                    setSubmission(quizSubmission);
                    setSubmitted(true);
                }
            }
        };
        fetchQuiz();
    }, [qid, isFaculty]);

    useEffect(() => {
        if (!isFaculty && quiz && !submitted && Object.keys(answers).length > 0) {
            const saveTimer = setTimeout(() => {
                setLastSaveTime(new Date());
            }, 30000);

            return () => clearTimeout(saveTimer);
        }
    }, [answers, isFaculty, quiz, submitted]);

    if (loading || !quiz || !currentUser) {
        return <div>Loading...</div>;
    }

    if (!isFaculty) {
        const now = new Date();
        const available = new Date(quiz.available);
        const until = new Date(quiz.until);
        const attemptsUsed = quizSubmission?.attemptsUsed || 0;

        if (now < available) {
            return (
                <div className="m-3">
                    <Alert variant="info">
                        This quiz is not available yet. It will be available from{" "}
                        {new Date(quiz.available).toLocaleString()}.
                    </Alert>
                </div>
            );
        }

        if (now > until) {
            return (
                <div className="m-3">
                    <Alert variant="warning">
                        This quiz is closed. The deadline was{" "}
                        {new Date(quiz.until).toLocaleString()}.
                    </Alert>
                </div>
            );
        }

        if (!quiz.published) {
            return (
                <div className="m-3">
                    <Alert variant="warning">This quiz is not published yet.</Alert>
                </div>
            );
        }

        if (quizSubmission && !quiz.multipleAttempts) {
            if (!submitted) {
                setSubmitted(true);
                setSubmission(quizSubmission);
                const submissionAnswers: Record<string, QuizAnswerSubmission> = {};
                quizSubmission.answers.forEach((ans: QuizAnswerSubmission) => {
                    submissionAnswers[ans._id] = ans;
                });
                setAnswers(submissionAnswers);
            }
        } else if (
            quizSubmission &&
            quiz.multipleAttempts &&
            attemptsUsed >= quiz.attemptsAllowed
        ) {
            if (!submitted) {
                setSubmitted(true);
                setSubmission(quizSubmission);
                const submissionAnswers: Record<string, QuizAnswerSubmission> = {};
                quizSubmission.answers.forEach((ans: QuizAnswerSubmission) => {
                    submissionAnswers[ans._id] = ans;
                });
                setAnswers(submissionAnswers);
            }
        }
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;

    const calculateScore = (): number => {
        const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
        const earnedPoints = quiz.questions.reduce((sum, question) => {
            const answer = answers[question._id];
            if (!answer) return sum;

            let isCorrect = false;
            if (question.type === "MULTIPLE_CHOICE") {
                isCorrect = answer.answer === question.correctMultipleChoice;
            } else if (question.type === "TRUE_FALSE") {
                isCorrect = answer.answerTrueFalse === question.correctTrueFalse;
            } else if (question.type === "FILL_IN_THE_BLANK") {
                const userAnswer = (answer.answer || "").toLowerCase().trim();
                const correctAnswers =
                    question.correctFillInTheBlank?.map((a) => a.toLowerCase().trim()) ||
                    [];
                isCorrect = correctAnswers.includes(userAnswer);
            }

            return sum + (isCorrect ? question.points : 0);
        }, 0);

        return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    };

    const getEarnedPoints = (): number => {
        return quiz.questions.reduce((sum, question) => {
            const answer = answers[question._id];
            if (!answer) return sum;

            let isCorrect = false;
            if (question.type === "MULTIPLE_CHOICE") {
                isCorrect = answer.answer === question.correctMultipleChoice;
            } else if (question.type === "TRUE_FALSE") {
                isCorrect = answer.answerTrueFalse === question.correctTrueFalse;
            } else if (question.type === "FILL_IN_THE_BLANK") {
                const userAnswer = (answer.answer || "").toLowerCase().trim();
                const correctAnswers =
                    question.correctFillInTheBlank?.map((a) => a.toLowerCase().trim()) ||
                    [];
                isCorrect = correctAnswers.includes(userAnswer);
            }

            return sum + (isCorrect ? question.points : 0);
        }, 0);
    };

    const isAnswerCorrect = (question: Question): boolean => {
        const answer = answers[question._id];
        if (!answer) return false;

        if (question.type === "MULTIPLE_CHOICE") {
            return answer.answer === question.correctMultipleChoice;
        } else if (question.type === "TRUE_FALSE") {
            return answer.answerTrueFalse === question.correctTrueFalse;
        } else if (question.type === "FILL_IN_THE_BLANK") {
            const userAnswer = (answer.answer || "").toLowerCase().trim();
            const correctAnswers =
                question.correctFillInTheBlank?.map((a) => a.toLowerCase().trim()) ||
                [];
            return correctAnswers.includes(userAnswer);
        }
        return false;
    };

    const handleAnswerChange = (questionId: string, value: string | boolean) => {
        if (submitted) return;

        const question = quiz.questions.find((q) => q._id === questionId);
        if (!question) return;

        const newAnswer: QuizAnswerSubmission = {
            _id: questionId,
        };

        if (
            question.type === "MULTIPLE_CHOICE" ||
            question.type === "FILL_IN_THE_BLANK"
        ) {
            newAnswer.answer = value as string;
        } else if (question.type === "TRUE_FALSE") {
            newAnswer.answerTrueFalse = value as boolean;
        }

        setAnswers({ ...answers, [questionId]: newAnswer });
    };

    const handleSubmit = async () => {
        if (!quiz || !currentUser) return;

        const score = calculateScore();
        const attemptsUsed = (quizSubmission?.attemptsUsed || 0) + 1;

        const submissionAnswers: QuizAnswerSubmission[] = Object.values(answers);

        const newSubmission: QuizSubmission = {
            _id: qid!,
            attemptsUsed,
            score,
            answers: submissionAnswers,
        };

        if (!isFaculty) {
            const updatedQuizzesTaken = currentUser.quizzesTaken
                ? currentUser.quizzesTaken.filter((s: QuizSubmission) => s._id !== qid)
                : [];
            updatedQuizzesTaken.push(newSubmission);

            const updatedUser = {
                ...currentUser,
                quizzesTaken: updatedQuizzesTaken,
            };

            await userClient.updateUser(updatedUser);
            dispatch(setCurrentUser(updatedUser));
        }

        setSubmission(newSubmission);
        setSubmitted(true);
    };

    const goToQuestion = (index: number) => {
        if (submitted && !isFaculty) return;
        setCurrentQuestionIndex(index);
    };

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

    const score = submission ? submission.score : calculateScore();
    const attemptsUsed = quizSubmission?.attemptsUsed || 0;
    const canTakeAgain =
        isFaculty ||
        (quiz.multipleAttempts && attemptsUsed < quiz.attemptsAllowed && submitted);

    return (
        <div className="m-3">
            <div className="mb-3">
                <h2>{quiz.title}</h2>
                {isPreview && (
                    <Alert variant="danger" className="mb-3">
                        This is a preview of the published version of the quiz
                    </Alert>
                )}
                {startTime && (
                    <div className="text-secondary mb-2">
                        Started: {startTime.toLocaleDateString()} at{" "}
                        {startTime.toLocaleTimeString()}
                    </div>
                )}
                {lastSaveTime && !submitted && (
                    <div className="text-secondary mb-2">
                        Quiz saved at {lastSaveTime.toLocaleTimeString()}
                    </div>
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
                    {/* Current Question */}
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

                            {!submitted && (
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
                                                        checked={
                                                            answers[currentQuestion._id]?.answer ===
                                                            idx.toString()
                                                        }
                                                        onChange={() =>
                                                            handleAnswerChange(
                                                                currentQuestion._id,
                                                                idx.toString(),
                                                            )
                                                        }
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
                                                checked={
                                                    answers[currentQuestion._id]?.answerTrueFalse === true
                                                }
                                                onChange={() =>
                                                    handleAnswerChange(currentQuestion._id, true)
                                                }
                                                className="mb-2"
                                            />
                                            <FormCheck
                                                type="radio"
                                                name={`question-${currentQuestion._id}`}
                                                id="false"
                                                label="False"
                                                checked={
                                                    answers[currentQuestion._id]?.answerTrueFalse ===
                                                    false
                                                }
                                                onChange={() =>
                                                    handleAnswerChange(currentQuestion._id, false)
                                                }
                                                className="mb-2"
                                            />
                                        </div>
                                    )}

                                    {currentQuestion.type === "FILL_IN_THE_BLANK" && (
                                        <FormControl
                                            type="text"
                                            value={answers[currentQuestion._id]?.answer || ""}
                                            onChange={(e) =>
                                                handleAnswerChange(currentQuestion._id, e.target.value)
                                            }
                                            placeholder="Enter your answer"
                                        />
                                    )}
                                </div>
                            )}

                            {submitted && (
                                <div>
                                    {currentQuestion.type === "MULTIPLE_CHOICE" && (
                                        <div>
                                            {currentQuestion.multipleChoiceOptions?.map(
                                                (option, idx) => {
                                                    const isSelected =
                                                        answers[currentQuestion._id]?.answer ===
                                                        idx.toString();
                                                    const isCorrect =
                                                        currentQuestion.correctMultipleChoice ===
                                                        idx.toString();
                                                    const isWrong = isSelected && !isCorrect;

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`mb-2 p-2 rounded ${isCorrect
                                                                    ? "bg-success bg-opacity-10"
                                                                    : isWrong
                                                                        ? "bg-danger bg-opacity-10"
                                                                        : ""
                                                                }`}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                {isCorrect && (
                                                                    <FaCheck className="text-success" />
                                                                )}
                                                                {isWrong && <FaTimes className="text-danger" />}
                                                                <FormCheck
                                                                    type="radio"
                                                                    name={`question-${currentQuestion._id}-result`}
                                                                    id={`option-result-${idx}`}
                                                                    label={option}
                                                                    checked={isSelected}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    )}

                                    {currentQuestion.type === "TRUE_FALSE" && (
                                        <div>
                                            {[true, false].map((value) => {
                                                const isSelected =
                                                    answers[currentQuestion._id]?.answerTrueFalse ===
                                                    value;
                                                const isCorrect =
                                                    currentQuestion.correctTrueFalse === value;
                                                const isWrong = isSelected && !isCorrect;

                                                return (
                                                    <div
                                                        key={value.toString()}
                                                        className={`mb-2 p-2 rounded ${isCorrect
                                                                ? "bg-success bg-opacity-10"
                                                                : isWrong
                                                                    ? "bg-danger bg-opacity-10"
                                                                    : ""
                                                            }`}
                                                    >
                                                        <div className="d-flex align-items-center gap-2">
                                                            {isCorrect && (
                                                                <FaCheck className="text-success" />
                                                            )}
                                                            {isWrong && <FaTimes className="text-danger" />}
                                                            <FormCheck
                                                                type="radio"
                                                                name={`question-${currentQuestion._id}-result`}
                                                                id={`${value}-result`}
                                                                label={value ? "True" : "False"}
                                                                checked={isSelected}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {currentQuestion.type === "FILL_IN_THE_BLANK" && (
                                        <div>
                                            <FormControl
                                                type="text"
                                                value={answers[currentQuestion._id]?.answer || ""}
                                                disabled
                                                className={
                                                    isAnswerCorrect(currentQuestion)
                                                        ? "bg-success bg-opacity-10"
                                                        : "bg-danger bg-opacity-10"
                                                }
                                            />
                                            {isAnswerCorrect(currentQuestion) ? (
                                                <FaCheck className="text-success mt-2" />
                                            ) : (
                                                <div className="mt-2">
                                                    <FaTimes className="text-danger" />
                                                    <div className="text-secondary small mt-1">
                                                        Correct answer(s):{" "}
                                                        {currentQuestion.correctFillInTheBlank?.join(", ")}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {!submitted && (
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
                                    {quiz.oneQuestionAtATime ? (
                                        currentQuestionIndex < totalQuestions - 1 ? (
                                            <Button
                                                variant="danger"
                                                onClick={handleNext}
                                                disabled={!answers[currentQuestion._id]}
                                            >
                                                Next ▸
                                            </Button>
                                        ) : (
                                            <Button variant="danger" onClick={handleSubmit}>
                                                Submit Quiz
                                            </Button>
                                        )
                                    ) : currentQuestionIndex < totalQuestions - 1 ? (
                                        <Button variant="danger" onClick={handleNext}>
                                            Next ▸
                                        </Button>
                                    ) : (
                                        <Button variant="danger" onClick={handleSubmit}>
                                            Submit Quiz
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {!quiz.oneQuestionAtATime &&
                        !submitted &&
                        currentQuestionIndex === totalQuestions - 1 && (
                            <div className="d-flex justify-content-end">
                                <Button variant="danger" size="lg" onClick={handleSubmit}>
                                    Submit Quiz
                                </Button>
                            </div>
                        )}

                    {submitted && (
                        <Alert
                            variant={score >= 70 ? "success" : "warning"}
                            className="mt-3"
                        >
                            <h5>
                                Final Score: {score}% ({getEarnedPoints()} /{" "}
                                {quiz.questions.reduce((sum, q) => sum + q.points, 0)} points)
                            </h5>
                            {!isFaculty && submission && (
                                <p>
                                    Attempts Used: {submission.attemptsUsed} /{" "}
                                    {quiz.attemptsAllowed}
                                </p>
                            )}
                        </Alert>
                    )}
                </div>

                {(!quiz.oneQuestionAtATime || submitted || isFaculty) && (
                    <div style={{ width: "200px" }}>
                        <h6>Questions</h6>
                        <ListGroup>
                            {quiz.questions.map((question, idx) => {
                                const hasAnswer = !!answers[question._id];
                                const isCurrent = idx === currentQuestionIndex;
                                const isCorrect = submitted && isAnswerCorrect(question);

                                return (
                                    <ListGroupItem
                                        key={question._id}
                                        action={
                                            (!submitted || isFaculty) &&
                                            (!quiz.oneQuestionAtATime || submitted || isFaculty)
                                        }
                                        active={isCurrent}
                                        onClick={() => {
                                            if (
                                                (!submitted || isFaculty) &&
                                                (!quiz.oneQuestionAtATime || submitted || isFaculty)
                                            ) {
                                                goToQuestion(idx);
                                            }
                                        }}
                                        className={`d-flex align-items-center gap-2 ${submitted && !isFaculty
                                                ? isCorrect
                                                    ? "text-success"
                                                    : "text-danger"
                                                : ""
                                            }`}
                                    >
                                        {submitted && !isFaculty && (
                                            <>
                                                {isCorrect ? (
                                                    <FaCheck className="text-success" />
                                                ) : (
                                                    <FaTimes className="text-danger" />
                                                )}
                                            </>
                                        )}
                                        {!hasAnswer && !submitted && (
                                            <span className="text-secondary">?</span>
                                        )}
                                        Question {idx + 1}
                                    </ListGroupItem>
                                );
                            })}
                        </ListGroup>
                    </div>
                )}
            </div>

            {canTakeAgain && submitted && (
                <div className="mt-3">
                    <Button
                        variant="danger"
                        onClick={() => {
                            setAnswers({});
                            setSubmitted(false);
                            setSubmission(null);
                            setCurrentQuestionIndex(0);
                            setStartTime(new Date());
                        }}
                    >
                        Take Quiz Again
                    </Button>
                </div>
            )}
        </div>
    );
}
