"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { User } from "../../types";
import * as client from "../client";

export default function Signin() {
    const [credentials, setCredentials] = useState<{
        username: string;
        password: string;
    }>({ username: "", password: "" });
    const dispatch = useDispatch();
    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user as User));
        redirect("/Dashboard");
    };

    return (
        <div id="wd-signin-screen">
            <h1>Sign in</h1>
            <FormControl
                placeholder="username"
                type="text"
                id="wd-username"
                className="mb-2"
                defaultValue={credentials.username}
                onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                }
            />
            <FormControl
                placeholder="password"
                type="password"
                id="wd-password"
                defaultValue={credentials.password}
                className="mb-2"
                onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                }
            />
            <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
                Sign in
            </Button>
            <Link href="Signup" id="wd-signup-link">
                Sign up
            </Link>
        </div>
    );
}
