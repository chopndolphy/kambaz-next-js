import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AssignmentsControls() {
    const { cid } = useParams<{ cid: string }>();
    return (
        <div className="text-nowrap">
            <span className="float-start">
                <InputGroup size="lg">
                    <InputGroupText>
                        <IoIosSearch className="position-relative me-0" />
                    </InputGroupText>
                    <FormControl type="text" placeholder="Search..." />
                </InputGroup>
            </span>
            <Link
                href={`/Courses/${cid}/Assignments/new`}
                className="btn btn-danger btn-lg me-1 float-end"
                id="wd-add-assignment"
            >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </Link>
            <Button
                variant="secondary"
                size="lg"
                className="me-1 float-end"
                id="wd-add-assignment-group"
            >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </Button>
        </div>
    );
}
