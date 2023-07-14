import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import * as syphonx from "syphonx-lib";
import { cloud } from "./lib";


import {
    Box,
    Chip,
    CircularProgress,
    Stack,
    SxProps,
    TextField,
    Theme,
    Typography
} from "@mui/material";

export interface Props {
    query: syphonx.SelectQuery;
    repeated?: boolean;
    name?: string;
    type?: syphonx.SelectType;
    sx?: SxProps<Theme>;
}

export default ({ query, sx }: Props) => {
    const [question, setQuestion] = useState("");
    const [busy, setBusy] = useState(false);
    const [conversation, setConversation] = useState<cloud.ChatConversation>();
    const [error, setError] = useState("");

    useEffect(() => {
        const conversation = cloud.createChatConversation();
        setConversation(conversation);
        setQuestion("");
    }, [query]);

    const questions = [
        "Explain how this selector works",
        "Why isn't it selecting anything?",
        "How do I filter the results?"
    ];

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter" && question && conversation)
            submitQuestion(question);
    }

    function submitQuestion(question: string) {
        if (!conversation)
            return;
        (async () => {
            try {
                setConversation({ ...conversation });
                question += ` \`${syphonx.renderJQuery(query)}\``;
                setBusy(true);
                await cloud.chat(question, conversation);
                setConversation({ ...conversation });
                setQuestion("");
                setError("");
                setBusy(false);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : JSON.stringify(err));
                setBusy(false);
            }
        })();
    }

    return (
        <Stack direction="column" sx={sx}>
            {conversation && conversation.messages.length > 0 && (
            <>
                <Box sx={{ mt: 2, "& > :not(style)": { mb: 1 } }}>
                    {conversation.messages.filter(message => ["user", "assistant"].includes(message.role)).map(message => (
                        <Typography
                            color={message.role === "user" ? "secondary" : undefined}
                            bgcolor={message.role === "user" ? "#eee" : undefined}
                        >
                            <ReactMarkdown children={message.content} />
                        </Typography>
                    ))}
                    {busy && <CircularProgress color="secondary" size="small" sx={{ width: 24 }} />}
                </Box>
            </>
            )}

            <TextField
                variant="standard"
                size="small"
                error={!!error}
                fullWidth
                placeholder="Ask me anything"
                value={question}
                helperText={error}
                onChange={event => setQuestion(event.target.value)}
                onKeyDown={handleKeyDown}
            />

            <Box sx={{ "& > :not(style)": { mt: 1, mr: 1 } }}>
                {questions.map((label, index) => (
                    <Chip
                        variant="filled"
                        color="secondary"
                        size="small"
                        key={index}
                        label={label}
                        onClick={() => submitQuestion(label)}
                    />
                ))}
            </Box>

        </Stack>
    );
};