"use client";
import {
    FormControl,
    FormLabel,
    FormSelect,
    FormCheck,
    InputGroup,
    Button,
} from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { RootState } from "@/app/(Kambaz)/store";
import { useSelector, useDispatch } from "react-redux";
import { Quiz, QuizGroup, QuizType } from "@/app/(Kambaz)/types";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addQuiz, updateQuiz, setQuizzes } from "../../../reducer";
import * as client from "../../../client";

const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
};

export default function QuizDetailsEditor() {
    const { qid, cid } = useParams<{ qid: string; cid: string }>();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const dispatch = useDispatch();
    const router = useRouter();
    const getQuiz = (): Quiz => {
        const q = quizzes.find((quiz: Quiz) => quiz._id === qid);
        return q
            ? q
            : {
                _id: uuidv4(),
                course: cid,
                title: "",
                description: "",
                points: 0,
                available: new Date().toISOString(),
                due: new Date().toISOString(),
                until: new Date().toISOString(),
                published: false,
                type: "GRADED_QUIZ",
                group: "QUIZZES",
                shuffleAnswers: true,
                timeLimit: 20,
                multipleAttempts: false,
                attemptsAllowed: 1,
                showCorrectAnswers: false,
                accessCode: "",
                oneQuestionAtATime: true,
                webcamRequired: false,
                lockQuestionsAfterAnswering: false,
                questions: [],
            };
    };
    const [quiz, setQuiz] = useState<Quiz>(getQuiz());
    useEffect(() => {
        const fetchData = async () => {
            if (qid !== "new") {
                const foundQuiz = await client.findQuizById(qid);
                if (foundQuiz) {
                    setQuiz(foundQuiz);
                }
            }
        };
        fetchData();
    }, [qid, cid]);

    const QUIZ_LIST = `/Courses/${cid}/Quizzes`;

    const onCreateQuizForCourse = async (quizToCreate: Quiz) => {
        const createdQuiz = await client.createQuizForCourse(cid, quizToCreate);
        dispatch(setQuizzes([...quizzes, createdQuiz]));
    };
    const onUpdateQuiz = async (quiz: Quiz) => {
        await client.updateQuiz(quiz);
        const newQuizzes = quizzes.map((q) => (q._id === quiz._id ? quiz : q));
        dispatch(setQuizzes(newQuizzes));
    };

    return (
        <div id="wd-quizzes-editor" className="fs-6 m-1">
            <div className="py-3">
                <div className="mb-3">
                    <FormControl
                        id="wd-quiz-name"
                        type="text"
                        value={quiz.title}
                        onChange={(e) => {
                            setQuiz({ ...quiz, title: e.target.value });
                        }}
                    />
                </div>
                <div className="mb-3">
                    <FormLabel htmlFor="wd-quiz-description">Quiz Instructions</FormLabel>
                    <FormControl
                        as="textarea"
                        id="wd-quiz-description"
                        rows={10}
                        value={quiz.description}
                        onChange={(e) => {
                            setQuiz({ ...quiz, description: e.target.value });
                        }}
                    ></FormControl>
                </div>
                <div className="m-2">
                    <Row className="mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1">
                            <FormLabel htmlFor="wd-quiz-type">Quiz Type</FormLabel>
                        </Col>
                        <Col sm={8}>
                            <FormSelect
                                id="wd-quiz-type"
                                onChange={(e) => {
                                    setQuiz({ ...quiz, type: e.target.value as QuizType });
                                }}
                                value={quiz.type}
                            >
                                <option value="GRADED_QUIZ">Graded Quiz</option>
                                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                                <option value="GRADED_SURVEY">Graded Survey</option>
                                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1">
                            <FormLabel htmlFor="wd-quiz-group">Quiz Group</FormLabel>
                        </Col>
                        <Col sm={8}>
                            <FormSelect
                                id="wd-quiz-group"
                                onChange={(e) => {
                                    setQuiz({ ...quiz, group: e.target.value as QuizGroup });
                                }}
                                value={quiz.group}
                            >
                                <option value="QUIZZES">Quizzes</option>
                                <option value="ASSIGNMENTS">Assignments</option>
                                <option value="EXAMS"> Exams </option>
                                <option value="PROJECT">Project</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1"></Col>
                        <Col sm={8}>
                            <FormLabel htmlFor="wd-quiz-options">
                                <b>Options</b>
                            </FormLabel>
                            <div className="wd-quiz-options">
                                <FormCheck
                                    className="wd-quiz-shuffle-answers mb-3"
                                    type="checkbox"
                                    checked={quiz.shuffleAnswers}
                                    label="Shuffle Answers"
                                    onChange={(e) => {
                                        setQuiz({ ...quiz, shuffleAnswers: e.target.checked });
                                    }}
                                />
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-quiz-time-limit" className="mb-1">
                                        Time Limit (Minutes)
                                    </FormLabel>
                                    <FormControl
                                        className="mb-3 wd-quiz-time-limit"
                                        type="number"
                                        value={quiz.timeLimit}
                                        onChange={(e) => {
                                            setQuiz({
                                                ...quiz,
                                                timeLimit: parseInt(e.target.value, 10),
                                            });
                                        }}
                                    />
                                </div>
                                <FormCheck
                                    className={
                                        quiz.multipleAttempts
                                            ? "wd-quiz-multiple-attempts mb-1"
                                            : "wd-quiz-multiple-attempts mb-3"
                                    }
                                    type="checkbox"
                                    checked={quiz.multipleAttempts}
                                    label="Multiple Attempts"
                                    onChange={(e) => {
                                        setQuiz({ ...quiz, multipleAttempts: e.target.checked });
                                    }}
                                />
                                {quiz.multipleAttempts && (
                                    <FormControl
                                        className="mb-3 wd-quiz-attempts-allowed"
                                        type="number"
                                        value={quiz.attemptsAllowed}
                                        onChange={(e) => {
                                            setQuiz({
                                                ...quiz,
                                                attemptsAllowed: parseInt(e.target.value, 10),
                                            });
                                        }}
                                    />
                                )}
                                <FormCheck
                                    className={
                                        quiz.showCorrectAnswers
                                            ? "mb-1 wd-quiz-show-correct-answers"
                                            : "mb-3 wd-quiz-show-correct-answers"
                                    }
                                    type="checkbox"
                                    checked={quiz.showCorrectAnswers}
                                    label="Show Correct Answers"
                                    onChange={(e) => {
                                        setQuiz({ ...quiz, showCorrectAnswers: e.target.checked });
                                    }}
                                />

                                {quiz.showCorrectAnswers && (
                                    <FormControl
                                        className="mb-3"
                                        type="date"
                                        value={formatDate(
                                            quiz.showCorrectAnswersDate || new Date().toISOString(),
                                        )}
                                        id="wd-quiz-show-correct-answers-date"
                                        onChange={(e) => {
                                            setQuiz({
                                                ...quiz,
                                                until: e.target.value,
                                            });
                                        }}
                                    />
                                )}
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-quiz-access-code" className="mb-1">
                                        Access Code
                                    </FormLabel>
                                    <FormControl
                                        className="mb-3 wd-quiz-access-code"
                                        type="text"
                                        value={quiz.accessCode}
                                        onChange={(e) => {
                                            setQuiz({
                                                ...quiz,
                                                accessCode: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <FormCheck
                                    className="wd-quiz-one-question-at-a-time mb-3"
                                    type="checkbox"
                                    checked={quiz.oneQuestionAtATime}
                                    label="One Question at a Time"
                                    onChange={(e) => {
                                        setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked });
                                    }}
                                />
                                <FormCheck
                                    className="wd-quiz-webcam-required mb-3"
                                    type="checkbox"
                                    checked={quiz.webcamRequired}
                                    label="Webcam Required"
                                    onChange={(e) => {
                                        setQuiz({ ...quiz, webcamRequired: e.target.checked });
                                    }}
                                />
                                <FormCheck
                                    className="wd-quiz-lock-questions-after-answering mb-3"
                                    type="checkbox"
                                    checked={quiz.lockQuestionsAfterAnswering}
                                    label="Lock Questions After Answering"
                                    onChange={(e) => {
                                        setQuiz({
                                            ...quiz,
                                            lockQuestionsAfterAnswering: e.target.checked,
                                        });
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4} className="d-flex justify-content-end mt-1">
                            <FormLabel htmlFor="wd-quiz-submission-type">Assign</FormLabel>
                        </Col>
                        <Col sm={8}>
                            <div className="border rounded px-3 pb-3 pt-2">
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-quiz-due-date" className="fs-6">
                                        <b>Due</b>
                                    </FormLabel>
                                    <FormControl
                                        type="date"
                                        value={formatDate(quiz.due)}
                                        id="wd-quiz-due-date"
                                        onChange={(e) => {
                                            setQuiz({ ...quiz, due: e.target.value });
                                        }}
                                    />
                                </div>
                                <Row className="d-flex">
                                    <Col className="mb-3">
                                        <FormLabel htmlFor="wd-quiz-due-date" className="fs-6">
                                            <b>Available from</b>
                                        </FormLabel>
                                        <FormControl
                                            type="date"
                                            value={formatDate(quiz.available)}
                                            id="wd-quiz-available-from"
                                            onChange={(e) => {
                                                setQuiz({
                                                    ...quiz,
                                                    available: e.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col className="mb-3">
                                        <FormLabel htmlFor="wd-quiz-due-date" className="fs-6">
                                            <b>Until</b>
                                        </FormLabel>
                                        <FormControl
                                            type="date"
                                            value={formatDate(quiz.until)}
                                            id="wd-quiz-available-until"
                                            onChange={(e) => {
                                                setQuiz({
                                                    ...quiz,
                                                    until: e.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <hr />

            <Button
                variant="danger"
                size="lg"
                className="me-1 float-end"
                onClick={() => {
                    if (qid === "new") {
                        onCreateQuizForCourse(quiz);
                    } else {
                        onUpdateQuiz(quiz);
                    }
                    router.push(`${QUIZ_LIST}/${qid}/Details`);
                }}
            >
                Save
            </Button>
            <Button
                variant="danger"
                size="lg"
                className="me-1 float-end"
                onClick={() => {
                    const publishedQuiz = {
                        ...quiz,
                        published: true,
                    };
                    if (qid === "new") {
                        onCreateQuizForCourse(publishedQuiz);
                    } else {
                        onUpdateQuiz(publishedQuiz);
                    }
                    router.push(QUIZ_LIST);
                }}
            >
                Save and Publish
            </Button>
            <Button
                variant="secondary"
                size="lg"
                className="me-1 float-end"
                onClick={() => router.push(QUIZ_LIST)}
            >
                Cancel
            </Button>
        </div>
    );
}
