import Link from "next/link";
export default function Signin() {
    return (
        <div id="wd-signin-screen">
            <h3>Sign in</h3>
            {/* Added defaultValues as mentioned in rubric */}
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
            <Link href="/Dashboard" id="wd-signin-btn">
                <button>Sign in</button>
            </Link>
            <br />
            <br /> {/* May need to remove later */}
            <Link href="Signup" id="wd-signup-link">
                <button>Sign up</button>
            </Link>
        </div>
    );
}
