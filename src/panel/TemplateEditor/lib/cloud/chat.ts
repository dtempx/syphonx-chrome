import * as request from "./request";

// https://platform.openai.com/docs/api-reference/chat
export interface ChatMessage {
    role: "assistant" | "user" | "system";
    content: string;
    name?: string; // [A-Za-z0-9_]{1,64}
}

export interface ChatConversation {
    messages: ChatMessage[];
}

export async function chat(conversation: ChatConversation): Promise<void> {
    const obj = { messages: conversation.messages };
    const response = await request.postJson("/chat", obj);
    conversation.messages = response.messages;
}

export function createChatConversation(): ChatConversation {
    return {
        messages: []
    };
}