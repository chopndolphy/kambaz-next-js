"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { RootState } from "../../store";
import { User } from "../../Database";

export default function Profile() {
    const [profile, setProfile] = useState<User>();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const fetchProfile = () => {
        if (!currentUser) return redirect("/Account/Signin");
        setProfile(currentUser);
    };
    const signout = () => {
        dispatch(setCurrentUser(null));
        redirect("/Account/Signin");
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <FormControl
                        defaultValue={profile.username}
                        placeholder="username"
                        id="wd-username"
                        type="text"
                        className="mb-2"
                        onChange={(e) =>
                            setProfile({ ...profile, username: e.target.value })
                        }
                    />
                    <FormControl
                        defaultValue={profile.password}
                        placeholder="password"
                        type="password"
                        id="wd-password"
                        className="mb-2"
                    />
                    <FormControl
                        defaultValue={profile.firstName}
                        placeholder="First Name"
                        id="wd-firstname"
                        type="text"
                        className="mb-2"
                    />
                    <FormControl
                        defaultValue={profile.lastName}
                        placeholder="Last Name"
                        id="wd-lastname"
                        type="text"
                        className="mb-2"
                    />
                    <FormControl
                        defaultValue={formatDate(profile.dob)}
                        type="date"
                        id="wd-dob"
                        className="mb-2"
                    />
                    <FormControl
                        defaultValue={profile.email}
                        type="email"
                        id="wd-email"
                        className="mb-2"
                    />
                    <FormSelect defaultValue={profile.role} id="wd-role" className="mb-2">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </FormSelect>
                    <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </Button>
                </div>
            )}
        </div>
    );
}
