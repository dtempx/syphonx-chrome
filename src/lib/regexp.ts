export const apiKey = /^[a-z0-9]{20}$/i;
export const email = /^[a-z0-9+_.-]+@[a-z0-9.-]+$/i;
export const filepath = /^[/][a-z][a-z0-9/_-]+[.](yaml|json)$/;
export const intermediateName = /^_[a-z]+[a-z0-9_]*$/i;
export const kebabCase = /^[a-z][a-z0-9-]*$/;
export const selectorName = /^(_{1,2})?[a-z]+[a-z0-9_]*$/i;
export const snakeCase = /^_?[a-z][a-z0-9_]*$/;
export const url = /^https?:\/\/[^\/]/;
