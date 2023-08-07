
import {
    getFirestore,
    onSnapshot,
    doc
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import * as request from "./request";

export interface User {
    createdAt?: string;
    email: string;
    id?: string;
    lastSeen?: string;
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

export function validateSession(user: User): boolean {
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
            const result = doc.data() as User;

            if (result)
                callback({ ...result, id: doc.id });
        }
    });
}
