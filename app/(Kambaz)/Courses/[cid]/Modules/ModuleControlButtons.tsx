import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
export default function ModuleControlButtons({
    moduleId,
    deleteModule,
    editModule,
}: {
    moduleId: string;
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void;
}) {
    return (
        <div className="float-end">
            <button
                style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                }}
                onClick={() => editModule(moduleId)}
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
                onClick={() => deleteModule(moduleId)}
            >
                <FaTrash className="text-danger me-2 mb-1" />
            </button>
            <GreenCheckmark />
            <BsPlus className="fs-4" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
