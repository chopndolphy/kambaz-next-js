import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
import { Enrollment } from "../Database";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const USERS_API = `${HTTP_SERVER}/api/users`;

//export const enrollUserInCourse = async (courseId: string) => {
//const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses/${courseId}`);
//return data;
//};
//export const removeEnrollment = async (enrollmentId: string) => {
//const response = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
//return response.data;
//};
//export const findEnrollmentsForCurrentUser = async () => {
//const { data } = await axiosWithCredentials.get(`${USERS_API}/current/enrollments`);
//return data;
//};
