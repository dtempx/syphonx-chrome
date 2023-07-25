import { Schema, Validator } from "jsonschema";
import * as syphonx from "syphonx-lib";
import { snakeify } from ".";

export function validateContract(contract: Schema, result: syphonx.ExtractState): void {
    if (result.data) {
        const validator = new Validator();
        const data = syphonx.unwrap(result.data);
        const { errors } = validator.validate(data, contract);
        for (const error of errors) {
            const code = `contract-${snakeify(error.name)}` as syphonx.ExtractErrorCode;
            const message = error.stack.replace(/^(instance\b)/, "Object");
            result.errors.push({ code, message, level: 1 }); 
        }    
    }
}
