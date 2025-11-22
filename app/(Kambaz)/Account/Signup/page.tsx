"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "../client";
import { User } from "../../Database";


export default function Signup() {
    const [user, setUser] = useState<Partial<User>>({
        username: "",
        password: "",
    });
    const dispatch = useDispatch();
    const signup = async () => {
        const currentUser = await client.signup(user as User);
        dispatch(setCurrentUser(currentUser));
        redirect("/Account/Profile");
    };

    return (
        <div id="wd-signup-screen">
            <h1>Sign up</h1>
            <FormControl
                placeholder="username"
                type="text"
                id="wd-username"
                value={user.username}
                className="mb-2"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <FormControl
                placeholder="password"
                type="password"
                id="wd-password"
                value={user.password}
                className="mb-2"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
            <Link id="wd-signin-link" href="Signin">
                Sign in
            </Link>
        </div>
    );
}
