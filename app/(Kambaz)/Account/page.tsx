"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { RootState } from "../store";

export default function AccountPage() {
    const { currentUser, isLoading } = useSelector(
        (state: RootState) => state.accountReducer,
    );

    if (isLoading) {
        return null;
    }

    if (!currentUser) {
        redirect("/Account/Signin");
    } else {
        redirect("/Account/Profile");
    }
}
