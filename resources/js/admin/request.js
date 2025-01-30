export async function request(url, options) {
    try {
        const response = await fetch(url, options);
        return response.json();
    } catch (error) {
        return error;
    }
}