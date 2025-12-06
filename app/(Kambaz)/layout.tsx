"use client";
import Session from "./Account/Session";
import { ReactNode, useState, useEffect } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";

export default function KambazLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Provider store={store}>
            <Session>
                <div id="wd-kambaz">
                    <div className="d-flex">
                        <div>
                            <KambazNavigation />
                        </div>
                        <div className="wd-main-content-offset p-3 flex-fill">
                            {children}
                        </div>
                    </div>
                </div>
            </Session>
        </Provider>
    );
}
