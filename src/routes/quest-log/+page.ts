import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    // 1. Fetch data
    const response = await fetch('http://localhost:3012/tasks');
    
    // 2. Check if the fetch worked (Prevent 500 errors)
    if (!response.ok) {
        console.error("Backend failed:", response.statusText);
        return { tasks: [] };
    }

    // 3. Convert to JSON
    const result = await response.json();

    // 4. Return data
    return {
        tasks: result.data
    };
};