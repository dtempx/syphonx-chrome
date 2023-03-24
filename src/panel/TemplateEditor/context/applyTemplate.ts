import { Schema, Validator } from "jsonschema";
import { background, snakeify, Template } from "../lib";
import * as syphonx from "syphonx-lib";

export async function applyTemplate(template: Template, schema?: Schema): Promise<syphonx.ExtractResult> {
    if (background.active) {
        try {
            const result = await background.applyTemplate(template.obj as syphonx.Template);

            if (result?.data && schema) {
                const validator = new Validator();
                const data = syphonx.removeDOMRefs(result.data);
                const { errors } = validator.validate(data, schema);
                for (const error of errors) {
                    const code = `contract-${snakeify(error.name)}` as syphonx.ExtractErrorCode;
                    const message = error.stack.replace(/^(instance\b)/, "Object");
                    result.errors.push({ code, message, level: 1 });
                }
            }

            return result!;
        }
        catch (err) {
            return { errors: [{ message: err instanceof Error ? err.message : JSON.stringify(err) }]} as syphonx.ExtractResult;
        }
    }
    else {
        return { data: { title: "Example Domain", href: "https://www.example.com/" }} as syphonx.ExtractResult;
    }
}