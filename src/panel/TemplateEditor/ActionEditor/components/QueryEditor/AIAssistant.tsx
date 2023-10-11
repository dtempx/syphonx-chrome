import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { renderJQuery, SelectQuery, SelectType } from "syphonx-lib";
import { cloud } from "./lib";
import { useApp, useQueryBuilder } from "./context";

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
    query: SelectQuery;
    repeated?: boolean;
    name?: string;
    type?: SelectType;
    sx?: SxProps<Theme>;
}

export default ({ query, sx }: Props) => {
    const [question, setQuestion] = useState("");
    const [busy, setBusy] = useState(false);
    const [conversation, setConversation] = useState<cloud.ChatConversation>();
    const [error, setError] = useState("");
    const { activeQueryResult } = useQueryBuilder();
    const { debug } = useApp();

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

    function addRole(conversation: cloud.ChatConversation): void {
        if (conversation.messages.length === 0)
        conversation.messages.push({
            role: "system",
            content: "Act as a web developer who is an expert at writing CSS selectors, jQuery selectors, and web scraping in general."
        });
    }

    function addQuestion(conversation: cloud.ChatConversation, content: string): void {
        conversation.messages.push({
            role: "user",
            content
        });
    }

    function addContext(conversation: cloud.ChatConversation): void {
        let content = `SELECTOR: \`${renderJQuery(query)}\``;
        const [output] = activeQueryResult;

        if (output?.html) {
            content += `GOAL: Write a CSS selector that targets the element on line ${output.linenums?.map(linenum => `#${linenum}`).join(", ")} in the HTML below.\n`;
            content += `\n\nHTML:\n\`\`\`\n${output.html}\n\`\`\`\n`;
            content += "Please note the line numbers are not part of the HTML document and are added here solely to make it easier to refer to specific elements in the HTML code.\n";
        }
        conversation.messages.push({
            role: "system",
            content
        });
    }

    function submitQuestion(question: string) {
        if (conversation) {
            addRole(conversation);
            addQuestion(conversation, question);
            addContext(conversation);

            setConversation({ ...conversation });
            setQuestion("");
            setError("");
            setBusy(true);

            (async () => {
                try {
                    await cloud.chat(conversation);
                    setConversation({ ...conversation });
                    setBusy(false);
                }
                catch (err) {
                    setError(err instanceof Error ? err.message : JSON.stringify(err));
                    setBusy(false);
                }
            })();            
        }
    }

    return (
        <Stack direction="column" sx={sx}>
            {conversation && conversation.messages.length > 0 && (
                <Box sx={{ "& > :not(style)": { mt: 1 } }}>
                    {conversation.messages.map(message => {
                        if (message.role === "system" && !debug)
                            return null; // only show system message if debug mode is enabled

                        let color = undefined;
                        let bgcolor = undefined;
                        let fontSize = undefined;
                        let sx = undefined;
                        if (message.role === "user") {
                            color = "secondary";
                            bgcolor = "#eee";
                        }
                        else if (message.role === "system") {
                            color = "#444";
                            bgcolor = "#ddd";
                            fontSize = 10;
                            sx = { overflow: "scroll" }
                        }

                        return (
                            <Typography
                                color={color}
                                bgcolor={bgcolor}
                                fontSize={fontSize}
                                sx={sx}
                            >
                                <ReactMarkdown children={message.content} />
                            </Typography>
                        );
                    })}
                </Box>
            )}
            {busy && <CircularProgress color="secondary" size={12} sx={{ mb: 1, position: "relative", top: -8, width: 24 }} />}

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