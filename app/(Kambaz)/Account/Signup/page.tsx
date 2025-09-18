import Link from "next/link";

export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input
                placeholder="username"
                type="text"
                className="wd-username"
                defaultValue="alice"
            />
            <br />
            <input
                placeholder="password"
                type="password"
                className="wd-password"
                defaultValue="123"
            />
            <br />
            <input
                placeholder="verify password"
                type="password"
                className="wd-password-verify"
                defaultValue="123"
            />
            <br />
            <Link href="Profile">
                <button>Sign up</button>
            </Link>
            <br />
            <br /> {/* May need to remove later */}
            <Link href="Signin">
                <button>Sign in</button>
            </Link>
        </div>
    );
}
