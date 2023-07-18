import * as request from "./request";
import { defaultUrl } from "./constants";

export interface CreateChatConversationOptions {
    apiKey?: string;
    apiUrl?: string;
}

export interface ChatMessage {
    role: string;
    content: string;
}

export interface ChatConversation {
    apiKey: string;
    apiUrl: string;
    messages: ChatMessage[];
}

export async function chat(question: string, conversation: ChatConversation): Promise<void> {
    conversation.messages.push({
        role: "user",
        content: question
    });
    const headers = { "Authorization": `Bearer ${conversation.apiKey}` };
    const url = `${conversation.apiUrl}/chat`;
    const obj = { messages: conversation.messages };
    const response = await request.postJson(url, obj, { headers });
    conversation.messages = response.messages;
}

export function createChatConversation({ apiKey = "", apiUrl = defaultUrl }: CreateChatConversationOptions = {}): ChatConversation {
    return {
        apiKey,
        apiUrl,
        messages: []
    };
}