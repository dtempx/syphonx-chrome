import React, { useEffect, useState } from "react";

import { SyphonXApi } from "syphonx-lib";
import { useApp } from "../../context";
import { Portal } from "../../Portal";
import { getUser, User, validateSession } from "../../TemplateEditor/lib/cloud";

export interface UserState {
    portal: Portal | undefined;
    setPortal: React.Dispatch<React.SetStateAction<Portal | undefined>>;
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    verified: boolean;
    setVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = React.createContext<UserState>({
    portal: undefined,
    setPortal: () => {},
    user: undefined,
    setUser: () => {},
    verified: false,
    setVerified: () => {},
});

export function UserProvider({ children }: { children: JSX.Element }) {
    const { serviceUrl } = useApp();
    const [portal, setPortal] = useState<Portal | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [verified, setVerified] = useState<boolean>(false);

    useEffect(() => {
        chrome.storage.local.get(
            [ "email" ],
            ({ email }) => {
                if (email !== undefined) {
                    (async () => {
                        const result = await getUser(email);
                        if (result)
                            setUser(result);
                    })();
                } else {
                    setUser(undefined);
                }
            }
        );
    }, []);

    useEffect(() => {
        const email = user?.email;
        if (email)
            chrome.storage.local.set({ email });
        else
            chrome.storage.local.remove("email");

        setVerified(user ? validateSession(user) : false);
    }, [user]);

    useEffect(() => {
        (async () => {
            try {
                if (!portal) { // to prevent repetitive calls...
                    const token = validateSession(user) ? `u/${user?.id}` : undefined;
                    const api = new SyphonXApi(token, serviceUrl, user?.email);
                    const auth = await api.auth();
                    setPortal(auth.portal);
                }
            } catch(err) {
                debugger;
                console.error(err);
                setPortal(undefined);
            }
        })();
    }, [user, serviceUrl]);

    const value = {
        portal,
        setPortal,
        user,
        setUser,
        verified,
        setVerified
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
