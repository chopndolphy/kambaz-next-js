import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useState } from "react";
import QuizDeleteDialog from "./QuizDeleteDialog";
import { Quiz } from "@/app/(Kambaz)/types";
import { Dropdown } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";

export default function QuizControlButtons({
    quiz,
    togglePublished,
    deleteQuiz,
}: {
    quiz: Quiz;
    togglePublished: () => void;
    deleteQuiz: () => void;
}) {
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const router = useRouter();
    const { cid } = useParams<{ cid: string }>();

    return (
        <div className="float-end">
            <Dropdown align="end">
                <Dropdown.Toggle
                    as="button"
                    bsPrefix="btn"
                    variant="link"
                    id={`dropdown-${quiz._id}`}
                    className="text-dark p-0 border-0 bg-transparent"
                    style={{ boxShadow: "none" }}
                >
                    <IoEllipsisVertical className="fs-4" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() =>
                            router.push(`/Courses/${cid}/Quizzes/${quiz._id}/Editor`)
                        }
                    >
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleShowDelete}>Delete</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={togglePublished}>
                        {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <QuizDeleteDialog
                show={showDelete}
                handleClose={handleCloseDelete}
                dialogTitle="Delete Quiz"
                quizName={quiz.title}
                deleteQuiz={deleteQuiz}
            />
        </div>
    );
}
