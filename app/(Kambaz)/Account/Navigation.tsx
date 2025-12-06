"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const pathname = usePathname();
    if (currentUser && currentUser.role === "ADMIN") {
        links.push("Users");
    }
    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link}
                    href={`/Account/${link}`}
                    className={
                        pathname.includes(link)
                            ? "list-group-item active border-0"
                            : "list-group-item text-danger border-0"
                    }
                >
                    {link}
                </Link>
            ))}
        </div>
    );
}
