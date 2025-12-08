import { Modal, Button } from "react-bootstrap";
export default function QuizDeleteDialog({
    show,
    handleClose,
    dialogTitle,
    quizName,
    deleteQuiz,
}: {
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    quizName: string;
    deleteQuiz: () => void;
}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center pb-4">
                Are you sure you want to <b>delete</b> the quiz:
                <br />
                <br />
                <h5>{quizName}</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        deleteQuiz();
                        handleClose();
                    }}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
