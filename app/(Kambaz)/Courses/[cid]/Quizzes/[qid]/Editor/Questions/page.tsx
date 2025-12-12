"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import {
    Button,
    FormControl,
    FormLabel,
    FormSelect,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaTrash, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
    Quiz,
    Question,
    QuestionType,
    questionTypeLabels,
} from "@/app/(Kambaz)/types";
import { v4 as uuidv4 } from "uuid";
import * as client from "../../../client";
import { updateQuiz, setQuizzes } from "../../../reducer";

export default function QuizQuestionsEditor() {
    const { qid, cid } = useParams<{ qid: string; cid: string }>();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const dispatch = useDispatch();
    const router = useRouter();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
        null,
    );
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (qid === "new") {
                const defaultQuiz: Quiz = {
                    _id: "new",
                    course: cid || "",
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
                setQuiz(defaultQuiz);
                setQuestions([]);
                setLoading(false);
            } else {
                const foundQuiz = quizzes.find((q: Quiz) => q._id === qid);
                if (foundQuiz) {
                    setQuiz(foundQuiz);
                    setQuestions(foundQuiz.questions || []);
                    setLoading(false);
                } else {
                    const fetchedQuiz = await client.findQuizById(qid);
                    if (fetchedQuiz) {
                        setQuiz(fetchedQuiz);
                        setQuestions(fetchedQuiz.questions || []);
                    }
                    setLoading(false);
                }
            }
        };
        fetchQuiz();
    }, [qid, cid, quizzes]);

    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

    const handleNewQuestion = () => {
        const newQuestion: Question = {
            _id: uuidv4(),
            type: "MULTIPLE_CHOICE",
            title: "New Question",
            points: 1,
            question: "",
            multipleChoiceOptions: ["", "", "", ""],
            correctMultipleChoice: "0",
        };
        setQuestions([...questions, newQuestion]);
        setEditingQuestionId(newQuestion._id);
        setEditingQuestion({ ...newQuestion });
    };

    const handleEdit = (question: Question) => {
        setEditingQuestionId(question._id);
        setEditingQuestion({ ...question });
    };

    const handleCancel = () => {
        setEditingQuestionId(null);
        setEditingQuestion(null);
    };

    const handleSave = () => {
        if (!editingQuestion) return;

        setQuestions(
            questions.map((q) =>
                q._id === editingQuestion._id ? editingQuestion : q,
            ),
        );
        setEditingQuestionId(null);
        setEditingQuestion(null);
    };

    const handleDelete = (id: string) => {
        setQuestions(questions.filter((q) => q._id !== id));
        if (editingQuestionId === id) {
            setEditingQuestionId(null);
            setEditingQuestion(null);
        }
    };

    const updateEditingQuestion = (updates: Partial<Question>) => {
        if (!editingQuestion) return;
        setEditingQuestion({ ...editingQuestion, ...updates });
    };

    const handleTypeChange = (newType: QuestionType) => {
        if (!editingQuestion) return;

        const baseQuestion: Question = {
            ...editingQuestion,
            type: newType,
            multipleChoiceOptions: undefined,
            correctMultipleChoice: undefined,
            correctTrueFalse: undefined,
            correctFillInTheBlank: undefined,
        };

        if (newType === "MULTIPLE_CHOICE") {
            baseQuestion.multipleChoiceOptions = ["", "", "", ""];
            baseQuestion.correctMultipleChoice = "0";
        } else if (newType === "TRUE_FALSE") {
            baseQuestion.correctTrueFalse = true;
        } else if (newType === "FILL_IN_THE_BLANK") {
            baseQuestion.correctFillInTheBlank = [""];
        }

        setEditingQuestion(baseQuestion);
    };
    const handleSavePublishQuiz = async () => {
        if (!quiz) return;

        const updatedQuiz: Quiz = {
            ...quiz,
            published: true,
            questions: questions,
            points: totalPoints,
        };

        if (qid === "new") {
            const createdQuiz = await client.createQuizForCourse(cid, updatedQuiz);
            dispatch(setQuizzes([...quizzes, createdQuiz]));
            router.push(`/Courses/${cid}/Quizzes/${createdQuiz._id}/Details`);
        } else {
            await client.updateQuiz(updatedQuiz);
            const newQuizzes = quizzes.map((q) =>
                q._id === updatedQuiz._id ? updatedQuiz : q,
            );
            dispatch(setQuizzes(newQuizzes));
            router.push(`/Courses/${cid}/Quizzes/${qid}/Details`);
        }
    };

    const handleSaveQuiz = async () => {
        if (!quiz) return;

        const updatedQuiz: Quiz = {
            ...quiz,
            questions: questions,
            points: totalPoints,
        };

        if (qid === "new") {
            const createdQuiz = await client.createQuizForCourse(cid, updatedQuiz);
            dispatch(setQuizzes([...quizzes, createdQuiz]));
            router.push(`/Courses/${cid}/Quizzes/${createdQuiz._id}/Details`);
        } else {
            await client.updateQuiz(updatedQuiz);
            const newQuizzes = quizzes.map((q) =>
                q._id === updatedQuiz._id ? updatedQuiz : q,
            );
            dispatch(setQuizzes(newQuizzes));
            router.push(`/Courses/${cid}/Quizzes/${qid}/Details`);
        }
    };

    const handleCancelEdit = () => {
        if (qid === "new") {
            router.push(`/Courses/${cid}/Quizzes`);
        } else {
            router.push(`/Courses/${cid}/Quizzes/${qid}/Details`);
        }
    };

    if (loading || !quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div id="wd-quiz-questions-editor" className="fs-6 m-1">
            <div className="mb-0 text-center">
                <Button
                    variant="secondary"
                    onClick={handleNewQuestion}
                    className="mb-3"
                    size="lg"
                >
                    + New Question
                </Button>
            </div>

            <ListGroup className="rounded-0">
                {questions.map((question, index) => (
                    <ListGroupItem
                        key={question._id}
                        id={`wd-question-item-${question._id}`}
                        className="p-3 mb-3 border"
                    >
                        {editingQuestionId === question._id && editingQuestion ? (
                            <div>
                                <Row className="mb-3">
                                    <Col sm={8}>
                                        <FormControl
                                            type="text"
                                            value={editingQuestion.title}
                                            onChange={(e) =>
                                                updateEditingQuestion({ title: e.target.value })
                                            }
                                            placeholder="Question title"
                                            className="mb-2"
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <FormSelect
                                            value={editingQuestion.type}
                                            onChange={(e) =>
                                                handleTypeChange(e.target.value as QuestionType)
                                            }
                                        >
                                            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                                            <option value="TRUE_FALSE">True/False</option>
                                            <option value="FILL_IN_THE_BLANK">
                                                Fill in the Blank
                                            </option>
                                        </FormSelect>
                                    </Col>
                                    <Col sm={2}>
                                        <div className="d-flex align-items-center gap-2">
                                            <FormLabel className="mb-0">pts:</FormLabel>
                                            <FormControl
                                                type="number"
                                                value={editingQuestion.points}
                                                onChange={(e) =>
                                                    updateEditingQuestion({
                                                        points: parseInt(e.target.value) || 0,
                                                    })
                                                }
                                                className="w-50"
                                                min="0"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <div className="mb-3">
                                    <FormLabel>Question:</FormLabel>
                                    <FormControl
                                        as="textarea"
                                        rows={3}
                                        value={editingQuestion.question}
                                        onChange={(e) =>
                                            updateEditingQuestion({ question: e.target.value })
                                        }
                                        placeholder="Enter your question text"
                                    />
                                </div>

                                {editingQuestion.type === "MULTIPLE_CHOICE" && (
                                    <div className="mb-3">
                                        <FormLabel>Answers:</FormLabel>
                                        {editingQuestion.multipleChoiceOptions?.map(
                                            (option, idx) => (
                                                <div
                                                    key={idx}
                                                    className="d-flex align-items-center gap-2 mb-2"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="correctAnswer"
                                                        checked={
                                                            editingQuestion.correctMultipleChoice ===
                                                            idx.toString()
                                                        }
                                                        onChange={() =>
                                                            updateEditingQuestion({
                                                                correctMultipleChoice: idx.toString(),
                                                            })
                                                        }
                                                        className="form-check-input"
                                                    />
                                                    {editingQuestion.correctMultipleChoice ===
                                                        idx.toString() && (
                                                            <FaCheck className="text-success" />
                                                        )}
                                                    <FormControl
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) => {
                                                            const newOptions = [
                                                                ...(editingQuestion.multipleChoiceOptions ||
                                                                    []),
                                                            ];
                                                            newOptions[idx] = e.target.value;
                                                            updateEditingQuestion({
                                                                multipleChoiceOptions: newOptions,
                                                            });
                                                        }}
                                                        placeholder={`Possible Answer ${idx + 1}`}
                                                    />
                                                    <button
                                                        style={{
                                                            background: "none",
                                                            border: "none",
                                                            padding: 0,
                                                            color: "inherit",
                                                        }}
                                                        onClick={() => {
                                                            const newOptions =
                                                                editingQuestion.multipleChoiceOptions?.filter(
                                                                    (_, i) => i !== idx,
                                                                );
                                                            updateEditingQuestion({
                                                                multipleChoiceOptions: newOptions,
                                                            });
                                                        }}
                                                    >
                                                        <FaTrash className="text-danger me-2 mb-1" />
                                                    </button>
                                                </div>
                                            ),
                                        )}
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => {
                                                const newOptions = [
                                                    ...(editingQuestion.multipleChoiceOptions || []),
                                                    "",
                                                ];
                                                updateEditingQuestion({
                                                    multipleChoiceOptions: newOptions,
                                                });
                                            }}
                                        >
                                            + Add Another Answer
                                        </Button>
                                    </div>
                                )}

                                {editingQuestion.type === "TRUE_FALSE" && (
                                    <div className="mb-3">
                                        <FormLabel>Answers:</FormLabel>
                                        <div className="d-flex flex-column gap-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="trueFalseAnswer"
                                                    checked={editingQuestion.correctTrueFalse === true}
                                                    onChange={() =>
                                                        updateEditingQuestion({ correctTrueFalse: true })
                                                    }
                                                    className="form-check-input"
                                                />
                                                {editingQuestion.correctTrueFalse === true && (
                                                    <FaCheck className="text-success" />
                                                )}
                                                <span>True</span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="trueFalseAnswer"
                                                    checked={editingQuestion.correctTrueFalse === false}
                                                    onChange={() =>
                                                        updateEditingQuestion({ correctTrueFalse: false })
                                                    }
                                                    className="form-check-input"
                                                />
                                                {editingQuestion.correctTrueFalse === false && (
                                                    <FaCheck className="text-success" />
                                                )}
                                                <span>False</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {editingQuestion.type === "FILL_IN_THE_BLANK" && (
                                    <div className="mb-3">
                                        <FormLabel>Answers:</FormLabel>
                                        {editingQuestion.correctFillInTheBlank?.map(
                                            (answer, idx) => (
                                                <div
                                                    key={idx}
                                                    className="d-flex align-items-center gap-2 mb-2"
                                                >
                                                    <FormControl
                                                        type="text"
                                                        value={answer}
                                                        onChange={(e) => {
                                                            const newAnswers = [
                                                                ...(editingQuestion.correctFillInTheBlank ||
                                                                    []),
                                                            ];
                                                            newAnswers[idx] = e.target.value;
                                                            updateEditingQuestion({
                                                                correctFillInTheBlank: newAnswers,
                                                            });
                                                        }}
                                                        placeholder={`Possible Answer: ${idx + 1}`}
                                                    />
                                                    <button
                                                        style={{
                                                            background: "none",
                                                            border: "none",
                                                            padding: 0,
                                                            color: "inherit",
                                                        }}
                                                        onClick={() => {
                                                            const newAnswers =
                                                                editingQuestion.correctFillInTheBlank?.filter(
                                                                    (_, i) => i !== idx,
                                                                );
                                                            updateEditingQuestion({
                                                                correctFillInTheBlank: newAnswers,
                                                            });
                                                        }}
                                                    >
                                                        <FaTrash className="text-danger me-2 mb-1" />
                                                    </button>
                                                </div>
                                            ),
                                        )}
                                        <div className="text-center">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => {
                                                    const newAnswers = [
                                                        ...(editingQuestion.correctFillInTheBlank || []),
                                                        "",
                                                    ];
                                                    updateEditingQuestion({
                                                        correctFillInTheBlank: newAnswers,
                                                    });
                                                }}
                                            >
                                                + Add Another Answer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <div className="d-flex gap-2 justify-content-end">
                                    <Button variant="secondary" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleSave}>
                                        Update Question
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="d-flex align-items-start justify-content-between">
                                    <div className="d-flex align-items-start gap-3 flex-grow-1">
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <span className="fw-bold">{question.title}</span>
                                                <span className="text-secondary small">
                                                    {questionTypeLabels[question.type]}
                                                </span>
                                                <span className="text-secondary small">
                                                    {question.points} pts
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                color: "inherit",
                                            }}
                                            onClick={() => handleEdit(question)}
                                        >
                                            <FaPencil className="text-primary me-2 mb-1" />
                                        </button>
                                        <button
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                color: "inherit",
                                            }}
                                            onClick={() => handleDelete(question._id)}
                                        >
                                            <FaTrash className="text-danger me-2 mb-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>

            {questions.length === 0 && (
                <div className="text-center text-secondary py-5">
                    <p>No questions yet. Click &quot;+ New Question&quot; to add one.</p>
                </div>
            )}
            <hr />
            <Button
                variant="danger"
                size="lg"
                className="me-1 float-end"
                onClick={handleSaveQuiz}
            >
                Save
            </Button>
            <Button
                variant="danger"
                size="lg"
                className="me-1 float-end"
                onClick={handleSavePublishQuiz}
            >
                Save and Publish
            </Button>
            <Button
                variant="secondary"
                size="lg"
                className="me-1 float-end"
                onClick={handleCancelEdit}
            >
                Cancel
            </Button>
        </div>
    );
}
