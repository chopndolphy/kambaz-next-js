"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "./store";
export default function Kambaz() {
    const { currentUser, isLoading } = useSelector(
        (state: RootState) => state.accountReducer,
    );

    if (isLoading) {
        return null;
    }

    if (currentUser) {
        redirect("/Dashboard");
    } else {
        redirect("/Account/Signin");
    }
}
