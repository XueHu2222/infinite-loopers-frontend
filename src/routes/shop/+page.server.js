import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ cookies, fetch }) => {
    try {
        const userId = cookies.get('userId');
        if (!userId) throw new Error("User ID not found in cookies");
        const charactersResponse = await fetch(`${PUBLIC_API_URL}/shop/characters`);
        const decorationsResponse = await fetch(`${PUBLIC_API_URL}/shop/decorations`);
        const ownedDecorationsResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}/decorations`);
        const ownedCharactersResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}/characters`);
        const userResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}`);

        if (!charactersResponse.ok) {
            throw new Error(`Failed to fetch all characters: ${charactersResponse.statusText}`);
        }

        if (!userResponse.ok) {
            throw new Error(`Failed to fetch information for current user: ${userResponse.statusText}`);
        }

        if (!decorationsResponse.ok) {
            throw new Error(`Failed to fetch all decorations: ${decorationsResponse.statusText}`);
        }

        if (!ownedDecorationsResponse.ok) {
            throw new Error(`Failed to fetch all decorations of user ${userId}: ${ownedDecorationsResponse.statusText}`);
        }

        if (!ownedCharactersResponse.ok) {
            throw new Error(`Failed to fetch all characters of user ${userId}: ${ownedDecorationsResponse.statusText}`);
        }

        const characterJson = await charactersResponse.json();
        const decorationJson = await decorationsResponse.json();
        const ownedDecorationsJson = await ownedDecorationsResponse.json();
        const ownedCharactersJson = await ownedCharactersResponse.json();
        const userJson = await userResponse.json();

        // All characters except the first one - it is the default character
        const allCharacters = characterJson.data.slice(1);
        const userInformation = userJson.data;
        const allDecorations = decorationJson.data;
        const ownedDecorationsData = ownedDecorationsJson.data;
        const ownedCharactersData = ownedCharactersJson.data;

        const ownedDecorationsArray = ownedDecorationsData.map((res) => res.data);
        const ownedCharactersArray = ownedCharactersData.map((res) => res.data);
        return { characters: allCharacters, user: userInformation, 
            decorations: allDecorations, ownedDecorations: ownedDecorationsArray,
            ownedCharacters: ownedCharactersArray
         };
    } catch (error) {
        console.error('Error loading characters:', error);
        return { error };
    }
};