import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ cookies, fetch }) => {
    try {
        const userId = cookies.get('userId');
        if (!userId) throw new Error("User ID not found in cookies");
        const charactersResponse = await fetch(`${PUBLIC_API_URL}/characters`);
        const userResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}`);

        if (!charactersResponse.ok) {
            throw new Error(`Failed to fetch all characters: ${charactersResponse.statusText}`);
        }

        if (!userResponse.ok) {
            throw new Error(`Failed to fetch information for current user: ${userResponse.statusText}`);
        }

        const characterJson = await charactersResponse.json();
        const userJson = await userResponse.json();
        const allCharacters = characterJson.data;
        const userInformation = userJson.data;
        return { characters: allCharacters, user: userInformation };
    } catch (error) {
        console.error('Error loading characters:', error);
        return { error };
    }
};