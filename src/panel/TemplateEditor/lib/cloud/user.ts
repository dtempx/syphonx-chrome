
import {
    getFirestore,
    onSnapshot,
    doc,
    Timestamp
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import * as request from "./request";

function formatDocument(obj: unknown): unknown {
    if (typeof obj === "object" && obj !== null) {
        const result: Record<string, unknown> = {};
        for (const key of Object.keys(obj)) {
            const value = (obj as Record<string, unknown>)[key];
            if (value instanceof Timestamp)
                result[key] = value.toDate();
            else if (typeof value === "object" && value !== null)
                result[key] = formatDocument(value as Record<string, unknown>);
            else
                result[key] = value;
        }
        return result;
    }
    else {
        return obj;
    }
}

export interface User {
    createdAt?: string;
    email: string;
    id?: string;
    lastSeen?: string;
    emailSent?: string;
}

const firebaseConfig = {
    apiKey: "AIzaSyBLP29REMuAreqc5xYPIDPTwHcqrKitq_E",
    authDomain: "syphonx.firebaseapp.com",
    projectId: "syphonx",
    storageBucket: "syphonx.appspot.com",
    messagingSenderId: "178110420185",
    appId: "1:178110420185:web:1c513f816451726398dac8"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const maxSessionLengthSeconds = 259200; // 3 days

export async function getUser(email: string): Promise<User> {
    const user = await request.json(`/user?email=${email}`);
    return user;
}

export function validateSession(user?: User): boolean {
    if (!user?.id)
        return false;
        
    const { lastSeen } = user;

    if (!lastSeen)
        return false;

    const now = (new Date()).valueOf() / 1000;
    const difference = now - ((new Date(lastSeen)).valueOf() / 1000);

    if (difference > maxSessionLengthSeconds)
        return false;

    return true;
}

export async function watchUser(id: string, callback: (user: User) => void) {
    const docRef = doc(firestore, `users/${id}`);

    onSnapshot(docRef, doc => {
        if (doc?.id) {
            const data = doc.data() as User;

            if (data) {
                const result = formatDocument(data) as User;
                callback({ ...result, id: doc.id });
            }
        }
    });
}
