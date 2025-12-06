import * as client from "./client";
import { useEffect } from "react";
import { setCurrentUser, setLoading } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "../store";
import axios from "axios";

const PUBLIC_PATHS = ["/Account/Signin", "/Account/Signup"];

export default function Session({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { currentUser, isLoading } = useSelector(
        (state: RootState) => state.accountReducer,
    );

    useEffect(() => {
        const fetchProfile = async () => {
            dispatch(setLoading(true));
            try {
                const currentUser = await client.profile();
                dispatch(setCurrentUser(currentUser));
            } catch (err: unknown) {
                if (axios.isAxiosError(err) && err.response?.status !== 401) {
                    console.error(err);
                }

                dispatch(setCurrentUser(null));
            }
        };
        fetchProfile();
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && !currentUser && !PUBLIC_PATHS.includes(pathname || "")) {
            router.push("/Account/Signin");
        }
    }, [isLoading, currentUser, pathname, router]);

    return <>{children}</>;
}
