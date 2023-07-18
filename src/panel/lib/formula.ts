import { inspectedWindow, stringifyFunction } from "../lib";

export async function evaluateFormula<T = any>(formula: string, params: Record<string, unknown> = {}): Promise<T> {
    const script = stringifyFunction(_evaluateFormula, formula, params);
    const result = await inspectedWindow.evaluate(script);
    return result;
}

export function isFormula(formula: unknown): boolean {
    return typeof formula === "string" && formula.startsWith("{") && formula.endsWith("}");
}

export function validateFormula(formula: string): boolean {
    return true; // todo
}

function _evaluateFormula(formula: string, params: Record<string, unknown>): unknown {
    const keys = Object.keys(params);
    const values = keys.map(key => params[key]);
    const fn = new Function(...keys, `return ${formula}`);
    const result = fn(...values);
    return result;
}