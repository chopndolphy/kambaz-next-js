"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { RootState } from "../../store";
import { User } from "../../types";
import * as client from "../client";

export default function Profile() {
    const [profile, setProfile] = useState<User>();
    const dispatch = useDispatch();
    const { currentUser, isLoading } = useSelector(
        (state: RootState) => state.accountReducer,
    );
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        redirect("/Account/Signin");
    };
    const updateProfile = async () => {
        if (!profile) return;
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };
    useEffect(() => {
        const fetchProfile = () => {
            if (isLoading) return;
            if (!currentUser) return redirect("/Account/Signin");
            setProfile(currentUser);
        };
        fetchProfile();
    }, [currentUser, isLoading]);

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
                        onChange={(e) =>
                            setProfile({ ...profile, password: e.target.value })
                        }
                    />
                    <FormControl
                        defaultValue={profile.firstName}
                        placeholder="First Name"
                        id="wd-firstname"
                        type="text"
                        className="mb-2"
                        onChange={(e) =>
                            setProfile({ ...profile, firstName: e.target.value })
                        }
                    />
                    <FormControl
                        defaultValue={profile.lastName}
                        placeholder="Last Name"
                        id="wd-lastname"
                        type="text"
                        className="mb-2"
                        onChange={(e) =>
                            setProfile({ ...profile, lastName: e.target.value })
                        }
                    />
                    <FormControl
                        defaultValue={formatDate(profile.dob)}
                        type="date"
                        id="wd-dob"
                        className="mb-2"
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                    />
                    <FormControl
                        defaultValue={profile.email}
                        type="email"
                        id="wd-email"
                        className="mb-2"
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    <FormSelect
                        defaultValue={profile.role}
                        id="wd-role"
                        className="mb-2"
                        onChange={(e) =>
                            setProfile({ ...profile, role: e.target.value as User["role"] })
                        }
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </FormSelect>
                    <button
                        onClick={updateProfile}
                        className="btn btn-primary w-100 mb-2"
                    >
                        {" "}
                        Update{" "}
                    </button>
                    <Button
                        variant="danger"
                        onClick={signout}
                        className="w-100 mb-2"
                        id="wd-signout-btn"
                    >
                        Sign out
                    </Button>
                </div>
            )}
        </div>
    );
}
