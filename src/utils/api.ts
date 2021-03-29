export function getFormEncodedParams(params: Record<string, string>) {
    const formUrlEncoded = new URLSearchParams();
    Object.keys(params).forEach((key) => formUrlEncoded.set(key, params[key]));
    return formUrlEncoded;
}

export function prepareQueryParams(params: Record<string, string>) {
    return '/?'.concat(
        Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join('&')
    );
}
