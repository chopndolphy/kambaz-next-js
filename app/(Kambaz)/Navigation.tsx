"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { GoBeaker, GoInbox } from "react-icons/go";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { NavLink, Nav, NavItem } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
    const pathname = usePathname();
    return (
        <Nav
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
            style={{ width: 110 }}
            id="wd-kambaz-navigation"
        >
            <NavItem
                className="bg-black border-0 text-center"
                as="a"
                href="https://www.northeastern.edu/"
                id="wd-neu-link"
                target="_blank"
            >
                <div className="d-flex justify-content-center">
                    <img
                        src="/images/NEU.png"
                        width="75px"
                        alt="Northeastern University"
                    />
                </div>
            </NavItem>
            <NavItem
                className={
                    pathname === "/Account/Signup" ||
                        pathname === "/Account/Signin" ||
                        pathname === "/Account/Profile"
                        ? "border-0 bg-white text-center"
                        : "border-0 bg-black text-center"
                }
            >
                <NavLink
                    href="/Account"
                    id="wd-account-link"
                    className={
                        pathname === "/Account/Signup" ||
                            pathname === "/Account/Signin" ||
                            pathname === "/Account/Profile"
                            ? "text-danger text-decoration-none"
                            : "text-white text=decoration-none"
                    }
                >
                    <FaRegCircleUser
                        className={
                            pathname === "/Account/Signup" ||
                                pathname === "/Account/Signin" ||
                                pathname === "/Account/Profile"
                                ? "fs-1 text-danger"
                                : "fs-1 text-white"
                        }
                    />
                    <br />
                    Account
                </NavLink>
            </NavItem>
            <NavItem
                className={
                    pathname === "/Dashboard"
                        ? "border-0 bg-white text-center"
                        : "border-0 bg-black text-center"
                }
            >
                <NavLink
                    href="/Dashboard"
                    id="wd-dashboard-link"
                    className={
                        pathname === "/Dashboard"
                            ? "text-danger text-decoration-none"
                            : "text-white text=decoration-none"
                    }
                >
                    <AiOutlineDashboard className="fs-1 text-danger" />
                    <br />
                    Dashboard
                </NavLink>
            </NavItem>
            <NavItem
                className={
                    pathname.startsWith("/Courses")
                        ? "border-0 bg-white text-center"
                        : "border-0 bg-black text-center"
                }
            >
                <NavLink
                    href="/Dashboard"
                    id="wd-course-link"
                    className={
                        pathname.startsWith("/Courses")
                            ? "text-danger text-decoration-none"
                            : "text-white text=decoration-none"
                    }
                >
                    <LiaBookSolid className="fs-1 text-danger" />
                    <br />
                    Courses
                </NavLink>
            </NavItem>
            <NavItem
                className={
                    pathname === "/Calendar"
                        ? "border-0 bg-white text-center"
                        : "border-0 bg-black text-center"
                }
            >
                <NavLink
                    href="/Calendar"
                    id="wd-calendar-link"
                    className={
                        pathname === "/Calendar"
                            ? "text-danger text-decoration-none"
                            : "text-white text=decoration-none"
                    }
                >
                    <IoCalendarOutline className="fs-1 text-danger" />
                    <br />
                    Calendar
                </NavLink>
            </NavItem>
            <NavItem
                className={
                    pathname === "/Inbox"
                        ? "border-0 bg-white text-center"
                        : "border-0 bg-black text-center"
                }
            >
                <NavLink
                    href="/Inbox"
                    id="wd-inbox-link"
                    className={
                        pathname === "/Inbox"
                            ? "text-danger text-decoration-none"
                            : "text-white text=decoration-none"
                    }
                >
                    <GoInbox className="fs-1 text-danger" />
                    <br />
                    Inbox
                </NavLink>
            </NavItem>
            <NavItem className="border-0 bg-black text-center">
                <NavLink
                    href="/Labs"
                    id="wd-labs-link"
                    className="text-white text-decoration-none"
                >
                    <GoBeaker className="fs-1 text-danger" />
                    <br />
                    Labs
                </NavLink>
            </NavItem>
        </Nav>
    );
}
