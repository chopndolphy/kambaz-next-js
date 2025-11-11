import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";
export { courses, modules, assignments, users, enrollments };
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
    course: string;
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
};
