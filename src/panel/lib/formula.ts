import { background } from "../lib";

export async function evaluateFormula<T = any>(formula: string, params: Record<string, unknown> = {}): Promise<T> {
    const script = iffy(_evaluateFormula, formula, params);
    const result = await background.inspectedWindow.evaluate(script);
    return result;
}

export function isFormula(formula: unknown): boolean {
    return typeof formula === "string" && formula.startsWith("{") && formula.endsWith("}");
}

export function validateFormula(formula: string): boolean {
    return true; // todo
}

function iffy(fn: Function, ...params: unknown[]): string {
    return `(${fn.toString()})(${JSON.stringify(params).slice(1, -1)})`;
}

function _evaluateFormula(formula: string, params: Record<string, unknown>): unknown {
    const keys = Object.keys(params);
    const values = keys.map(key => params[key]);
    const fn = new Function(...keys, `return ${formula}`);
    const result = fn(...values);
    return result;
}