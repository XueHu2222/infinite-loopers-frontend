import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ cookies, fetch }) => {
    try {
        const userId = cookies.get('userId');
        if (!userId) throw new Error("User ID not found in cookies");

        const characterResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}/characters/current`);
        const tasksResponse = await fetch(`${PUBLIC_API_URL}/tasks/${userId}`);
        const shopResponse = await fetch(`${PUBLIC_API_URL}/shop/decorations`);
        const userDecorationsPlacedResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}/decorations/placed`);

        if (!characterResponse.ok) {
            throw new Error(`Failed to fetch the current character: ${characterResponse.statusText}`);
        }

        if (!tasksResponse.ok) {
            throw new Error(`Failed to fetch tasks: ${tasksResponse.statusText}`);
        }
        if (!shopResponse.ok) {
            throw new Error(`Failed to fetch all decorations: ${shopResponse.statusText}`);
        }

        if (!userDecorationsPlacedResponse.ok) {
            throw new Error(`Failed to fetch placed decorations: ${userDecorationsPlacedResponse.statusText}`);
        }

        const userCharacterJson = await characterResponse.json();
        const tasksJson = await tasksResponse.json();
        
        const allTasks = tasksJson.tasks;
        const characterJson = userCharacterJson.data;
        const currentCharacter = characterJson.data;

        const allDecorationsJson = await shopResponse.json();
        const allDecorationsData = allDecorationsJson.data;
        const placedDecorationsJson = await userDecorationsPlacedResponse.json();
        const placedDecorationsData = placedDecorationsJson.data.placedDecorationIds;
        const placedDecorations = allDecorationsData.filter((/** @type {{ id: any; }} */ deco) => placedDecorationsData.includes(deco.id));
        return { character: currentCharacter, decorations: placedDecorations, tasks: allTasks};
    } catch (error) {
        console.error('Error loading character:', error);
        return { error };
    }
};