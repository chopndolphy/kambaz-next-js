"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
    const pathname = usePathname();
    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            <Link
                href="/Account/Signin"
                className={
                    pathname === "/Account/Signin"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Signin
            </Link>
            <Link
                href="/Account/Signup"
                className={
                    pathname === "/Account/Signup"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Signup
            </Link>
            <Link
                href="/Account/Profile"
                className={
                    pathname === "/Account/Profile"
                        ? "list-group-item active border-0"
                        : "list-group-item text-danger border-0"
                }
            >
                Profile
            </Link>
        </div>
    );
}
