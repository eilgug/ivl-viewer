export function bannedWords(): RegExp {
    const regex = /\s+(top|elite|basic)/gi;
    return regex;
}
