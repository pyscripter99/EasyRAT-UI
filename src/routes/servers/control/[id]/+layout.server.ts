import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
    return {params};
}) satisfies LayoutServerLoad;