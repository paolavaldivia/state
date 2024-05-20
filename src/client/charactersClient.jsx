const API_URL = "http://localhost:3001";

export function sleep(timeout) {
    return new Promise((resolve, _reject) => {
        setTimeout(resolve, timeout)
    })
}

export const getCharacters = async () => {
    await sleep(4000);
    const response = await fetch(`${API_URL}/characters`)
    return response.json();
}