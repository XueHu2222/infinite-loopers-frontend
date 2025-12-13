import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ cookies, fetch }) => {
    try {
        const userId = cookies.get('userId');
        if (!userId) throw new Error("User ID not found in cookies");
        const characterResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}/characters/current`);

        if (!characterResponse.ok) {
            throw new Error(`Failed to fetch the current character: ${characterResponse.statusText}`);
        }

        const userCharacterJson = await characterResponse.json();
        const characterJson = userCharacterJson.data;
        const currentCharacter = characterJson.data;
        return { character: currentCharacter };
    } catch (error) {
        console.error('Error loading character:', error);
        return { error };
    }
};