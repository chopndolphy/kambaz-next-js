import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useState } from "react";
import AssignmentDeleteDialog from "./AssignmentDeleteDialog";
export default function AssignmentControlButtons({
    assignmentName,
    deleteAssignment,
}: {
    assignmentName: string;
    deleteAssignment: () => void;
}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="float-end">
            <button
                style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                }}
                onClick={handleShow}
            >
                <FaTrash className="text-danger me-2 mb-1" />
            </button>
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
            <AssignmentDeleteDialog
                show={show}
                handleClose={handleClose}
                dialogTitle="Delete Assigment"
                assignmentName={assignmentName}
                deleteAssignment={deleteAssignment}
            />
        </div>
    );
}
