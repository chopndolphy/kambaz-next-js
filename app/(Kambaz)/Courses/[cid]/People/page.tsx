"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./PeopleTable";
import * as client from "../../client";
import { User } from "@/app/(Kambaz)/types";
export default function People() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { cid } = useParams<{ cid: string }>();

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        const users = await client.findUsersForCourse(cid);
        setUsers(users);
        setLoading(false);
    }, [cid]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (loading) return <div>Loading...</div>;

    return <PeopleTable users={users} fetchUsers={fetchUsers}></PeopleTable>;
}
