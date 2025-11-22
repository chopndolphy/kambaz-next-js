"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function TOC() {
    const pathname = usePathname();
    return (
        <Nav variant="pills" id="wd-toc">
            <NavItem>
                <NavLink
                    href="/Labs"
                    as={Link}
                    className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}
                >
                    Labs
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    href="/Labs/Lab1"
                    as={Link}
                    id="wd-1"
                    className={`nav-link ${pathname.endsWith("Labs1") ? "active" : ""}`}
                >
                    Lab 1
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    href="/Labs/Lab2"
                    as={Link}
                    id="wd-a2"
                    className={`nav-link ${pathname.endsWith("Labs2") ? "active" : ""}`}
                >
                    Lab 2
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    href="/Labs/Lab3"
                    as={Link}
                    id="wd-a3"
                    className={`nav-link ${pathname.endsWith("Labs3") ? "active" : ""}`}
                >
                    Lab 3
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    href="/Labs/Lab4"
                    as={Link}
                    id="wd-a3"
                    className={`nav-link ${pathname.endsWith("Labs4") ? "active" : ""}`}
                >
                    Lab 4
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    href="/Labs/Lab5"
                    as={Link}
                    id="wd-a3"
                    className={`nav-link ${pathname.endsWith("Labs5") ? "active" : ""}`}
                >
                    Lab 5
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/" as={Link}>
                    Kambaz
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    href="https://github.com/chopndolphy/kambaz-next-js"
                    target="_blank"
                >
                    Project Github
                </NavLink>
            </NavItem>
        </Nav>
    );
}
