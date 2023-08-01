
import {
    getFirestore,
    collection,
    query,
    where,
    limit,
    onSnapshot
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { defaultUrl } from "./constants";

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

export async function getUser(email: string, apiUrl = defaultUrl): Promise<User> {
    const response = await fetch(`${apiUrl}/user?email=${email}`);
    const result = await response.json() as User;

    return result;
}

export function validateSession(user: User): boolean {
    const { lastSeen, } = user;

    if (!lastSeen)
        return false;

    const now = (new Date()).valueOf() / 1000;
    const difference = now - ((new Date(lastSeen)).valueOf() / 1000);

    if (difference > maxSessionLengthSeconds)
        return false;

    return true;
}

export async function watchUser(email: string, callback: (user: User) => void) {
    const usersCollection = collection(firestore, "users");
    const q = query(usersCollection, where("email", "==", email), limit(1));

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const result = doc.data() as User;

            if (result)
                callback({ ...result, id: doc.id, });
        });
    });
}
