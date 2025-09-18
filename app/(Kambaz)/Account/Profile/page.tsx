import Link from "next/link";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            <input
                defaultValue="alice"
                placeholder="username"
                className="wd-username"
                type="text"
            />
            <br />
            <input
                defaultValue="123"
                placeholder="password"
                type="password"
                className="wd-password"
            />
            <br />
            <input
                defaultValue="Alice"
                placeholder="First Name"
                id="wd-firstname"
                type="text"
            />
            <br />
            <input
                defaultValue="Wonderland"
                placeholder="Last Name"
                id="wd-lastname"
                type="text"
            />
            <br />
            <input defaultValue="2000-01-01" type="date" id="wd-dob" />
            <br />
            <input defaultValue="alice@wonderland" type="email" id="wd-email" />
            <br />
            <select defaultValue="FACULTY" id="wd-role">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select>
            <br /> {/* May need to remove later */}
            <br /> {/* May need to remove later */}
            <Link href="Signin">
                <button>Sign out</button>
            </Link>
        </div>
    );
}
