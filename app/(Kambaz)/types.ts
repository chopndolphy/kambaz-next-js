export interface QuizAnswerSubmission {
    _id: string;
    answer?: string;
    answerTrueFalse?: boolean;
}

export interface QuizSubmission {
    _id: string;
    attemptsUsed: number;
    score: number;
    answers: QuizAnswerSubmission[];
}

export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: "FACULTY" | "STUDENT" | "TA" | "ADMIN";
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
    quizzesTaken: QuizSubmission[];
}

export type Course = {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    image: string;
    description: string;
    modules?: Module[];
};

export type Lesson = {
    _id: string;
    name: string;
    description: string;
    module: string;
};

export type Module = {
    _id: string;
    name: string;
    description: string;
    lessons?: Lesson[];
    editing?: boolean;
};

export type Assignment = {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    available: string;
    due: string;
    until: string;
};

export type Enrollment = {
    _id: string;
    user: string;
    course: string;
    grade?: number;
    letterGrade?: string;
    enrollmentDate?: string;
    status?: "ENROLLED" | "DROPPED" | "COMPLETED";
};
export type QuizType =
    | "GRADED_QUIZ"
    | "PRACTICE_QUIZ"
    | "GRADED_SURVEY"
    | "UNGRADED_SURVEY";

export type QuizGroup = "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";

export type QuestionType =
    | "MULTIPLE_CHOICE"
    | "TRUE_FALSE"
    | "FILL_IN_THE_BLANK";

export interface Question {
    _id: string;
    type: QuestionType;
    title: string;
    points: number;
    question: string;
    multipleChoiceOptions?: string[];
    correctMultipleChoice?: string;
    correctTrueFalse?: boolean;
    correctFillInTheBlank?: string[];
}

export interface Quiz {
    _id: string;
    title: string;
    description: string;
    points: number;
    due: string;
    available: string;
    until: string;
    course: string;
    published: boolean;
    type: QuizType;
    group: QuizGroup;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    attemptsAllowed: number;
    showCorrectAnswers: boolean;
    showCorrectAnswersDate?: string;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    questions: Question[];
}

export const quizTypeLabels: Record<QuizType, string> = {
    GRADED_QUIZ: "Graded Quiz",
    PRACTICE_QUIZ: "Practice Quiz",
    GRADED_SURVEY: "Graded Survey",
    UNGRADED_SURVEY: "Ungraded Survey",
};

export const quizGroupLabels: Record<QuizGroup, string> = {
    QUIZZES: "Quizzes",
    EXAMS: "Exams",
    ASSIGNMENTS: "Assignments",
    PROJECT: "Project",
};

export const questionTypeLabels: Record<QuestionType, string> = {
    MULTIPLE_CHOICE: "Multiple Choice",
    TRUE_FALSE: "True/False",
    FILL_IN_THE_BLANK: "Fill in the Blank",
};

export const userRoleLabels: Record<User["role"], string> = {
    FACULTY: "Faculty",
    STUDENT: "Student",
    TA: "Teaching Assistant",
    ADMIN: "Administrator",
};

export const enrollmentStatusLabels: Record<
    NonNullable<Enrollment["status"]>,
    string
> = {
    ENROLLED: "Enrolled",
    DROPPED: "Dropped",
    COMPLETED: "Completed",
};

export const getQuizTypeLabel = (type: QuizType) => quizTypeLabels[type];
export const getQuizGroupLabel = (group: QuizGroup) => quizGroupLabels[group];
export const getQuestionTypeLabel = (type: QuestionType) =>
    questionTypeLabels[type];
export const getUserRoleLabel = (role: User["role"]) => userRoleLabels[role];
export const getEnrollmentStatusLabel = (
    status: NonNullable<Enrollment["status"]>,
) => enrollmentStatusLabels[status];
