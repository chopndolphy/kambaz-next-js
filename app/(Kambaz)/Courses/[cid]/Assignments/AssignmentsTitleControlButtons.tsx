import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsPlus } from "react-icons/bs";
export default function AssignmentsTitleControlButtons() {
    return (
        <div className="float-end">
            <span className="border border-dark rounded p-1">40% of Total</span>
            <BsPlus className="fs-4" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
