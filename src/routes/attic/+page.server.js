import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ cookies, fetch }) => {
    try {
        const userId = cookies.get('userId');
        if (!userId) throw new Error("User ID not found in cookies");
        const decorationsResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}/decorations`);
        const placedDecorationsResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}/decorations/placed`);
        const userResponse = await fetch(`${PUBLIC_API_URL}/users/${userId}`);

        if (!decorationsResponse.ok) {
            throw new Error(`Failed to fetch all decorations of user ${userId}: ${decorationsResponse.statusText}`);
        }

        if (!placedDecorationsResponse.ok) {
            throw new Error(`Failed to fetch all placed decorations of user ${userId}: ${decorationsResponse.statusText}`);
        }

        if (!userResponse.ok) {
            throw new Error(`Failed to fetch information for current user: ${userResponse.statusText}`);
        }

        const decorationsJson = await decorationsResponse.json();
        const placedDecorationsJson = await placedDecorationsResponse.json();
        const userJson = await userResponse.json();

        const allUserDecorationsJson = decorationsJson.data;
        const userInformation = userJson.data;
        const allPlacedDecorations = placedDecorationsJson.data;
        const allUserDecorationsArray = allUserDecorationsJson.map((/** @type {{ data: any; }} */ deco) => (deco.data));
        return { decorations: allUserDecorationsArray, user: userInformation, placedDecorations: allPlacedDecorations.placedDecorationIds };
    } catch (error) {
        console.error('Error loading decorations:', error);
        return { error };
    }
};