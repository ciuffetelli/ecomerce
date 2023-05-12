export function objectToQueryString(obj: any) {
    return Object.keys(obj).map((key) => obj[key] ? `${key}=${obj[key]}` : undefined).filter(item => item).join('&');
}