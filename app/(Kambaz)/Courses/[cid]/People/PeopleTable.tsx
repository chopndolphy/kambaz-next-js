"use client";
import { useState, useEffect } from "react";
import { User } from "../../../types";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";

interface PeopleTableProps {
    users: User[];
    fetchUsers: () => void | Promise<void>;
}

export default function PeopleTable({ users, fetchUsers }: PeopleTableProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [showUserId, setShowUserId] = useState<string | null>(null);
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    if (!currentUser) {
        return;
    }

    const showControls =
        currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

    return (
        <div id="wd-people-table">
            {showDetails && (
                <PeopleDetails
                    uid={showUserId}
                    onClose={() => {
                        setShowDetails(false);
                        fetchUsers();
                    }}
                />
            )}

            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        {showControls && <th>Login ID</th>}
                        <th>Section</th>
                        <th>Role</th>
                        {showControls && <th>Last Activity</th>}
                        {showControls && <th>Total Activity</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="wd-full-name text-nowrap">
                                <span
                                    className="text-decoration-none"
                                    onClick={() => {
                                        if (showControls) {
                                            setShowDetails(true);
                                            setShowUserId(user._id);
                                        }
                                    }}
                                >
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName} </span>
                                    <span className="wd-last-name">{user.lastName}</span>
                                </span>
                            </td>
                            {showControls && <td className="wd-login-id">{user.loginId}</td>}
                            <td className="wd-section">{user.section}</td>
                            <td className="wd-role">{user.role}</td>
                            {showControls && (
                                <td className="wd-last-activity">{user.lastActivity}</td>
                            )}
                            {showControls && (
                                <td className="wd-total-activity">{user.totalActivity}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
