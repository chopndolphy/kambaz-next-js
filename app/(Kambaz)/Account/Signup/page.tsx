import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1>Sign up</h1>
            <FormControl
                placeholder="username"
                type="text"
                id="wd-username"
                defaultValue="alice"
                className="mb-2"
            />
            <FormControl
                placeholder="password"
                type="password"
                id="wd-password"
                defaultValue="123"
                className="mb-2"
            />
            <FormControl
                placeholder="verify password"
                type="password"
                id="wd-password-verify"
                defaultValue="123"
                className="mb-2"
            />
            <Link href="Profile" className="btn btn-primary w-100 mb-2">
                Sign up
            </Link>
            <Link id="wd-signin-link" href="Signin">
                Sign in
            </Link>
        </div>
    );
}
