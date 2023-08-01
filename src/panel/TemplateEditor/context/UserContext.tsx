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

export function useUser() {
    return React.useContext(UserContext);
}

export function UserProvider({ children }: { children: JSX.Element }) {
    const { serviceUrl } = useApp();
    const [portal, setPortal] = useState<Portal | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [verified, setVerified] = useState<boolean>(false);

    useEffect(() => {
        chrome.storage.local.get(
            [ "user" ],
            ({ user }) => {
                if (user !== undefined) {
                    const data = JSON.parse(user);
                    (async () => {
                        if (data?.email) {
                            const result = await getUser(data.email);
                            if (result)
                                setUser(result);
                        }
                    })();
                }
            }
        );
    }, []);

    useEffect(() => {
        if (user)
            chrome.storage.local.set({ user: JSON.stringify(user) });
        else
            chrome.storage.local.remove("user");
    }, [user]);

    useEffect(() => {
        (async () => {
            try {
                if (!portal) { // to prevent repetitive calls...
                    const token = user?.id ? `u/${user.id}` : undefined;
                    const api = new SyphonXApi(token, serviceUrl);
                    const auth = await api.auth();
                    setPortal(auth.portal);
                }
            } catch(err) {
                debugger;
                console.error(err);
                setPortal(undefined);
            }

            if (user)
                setVerified(validateSession(user));
            else
                setVerified(false);
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
