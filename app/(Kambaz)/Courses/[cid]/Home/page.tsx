"use client";
import Modules from "../Modules/page";
import CourseStatus from "./Status";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Home() {
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    return (
        <div id="wd-home">
            <div className="d-flex" id="wd-home">
                <div className="flex-fill me-3">
                    <Modules />
                </div>
                {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
                    <div className="d-none d-xl-block">
                        <CourseStatus />
                    </div>
                )}
            </div>
        </div>
    );
}
