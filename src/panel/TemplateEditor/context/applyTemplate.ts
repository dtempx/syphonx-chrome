import { Schema, Validator } from "jsonschema";
import { background, snakeify, Template } from "../lib";
import * as syphonx from "syphonx-lib";

export interface ApplyTemplateOptions {
    template: Template;
    contract?: Schema;
    url?: string;
    debug?: boolean;
};

export async function applyTemplate({ template, contract, url, debug }: ApplyTemplateOptions): Promise<syphonx.ExtractResult> {
    if (background.active) {
        try {
            const result = await background.applyTemplate({ ...template.obj as syphonx.Template, url, debug });
            if (result?.data && contract) {
                const validator = new Validator();
                const data = syphonx.unwrap(result.data);
                const { errors } = validator.validate(data, contract);
                for (const error of errors) {
                    const code = `contract-${snakeify(error.name)}` as syphonx.ExtractErrorCode;
                    const message = error.stack.replace(/^(instance\b)/, "Object");
                    result.errors.push({ code, message, level: 1 });
                }
            }
            return result!;
        }
        catch (err) {
            return { errors: [{ message: err instanceof Error ? err.message : JSON.stringify(err) }]} as unknown as syphonx.ExtractResult;
        }
    }
    else {
        return { data: { title: "Example Domain", href: "https://www.example.com/" }} as unknown as syphonx.ExtractResult;
    }
}