import { Modal, Button } from "react-bootstrap";
export default function AssignmentDeleteDialog({
    show,
    handleClose,
    dialogTitle,
    assignmentName,
    deleteAssignment,
}: {
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    assignmentName: string;
    deleteAssignment: () => void;
}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center pb-4">
                Are you sure you want to <b>delete</b> the assignment:
                <br />
                <br />
                <h5>{assignmentName}</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        deleteAssignment();
                        handleClose();
                    }}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
