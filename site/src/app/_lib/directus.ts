import { createDirectus, rest } from '@directus/sdk';
import { env } from "@/env.js";
import { CustomDirectusTypes } from "@/types/directus";

const createDirectusClient = () =>
    // TODO: Replace with Directus URL from environment variable
    createDirectus<CustomDirectusTypes>(env.DIRECTUS_URL).with(
        rest({
            onRequest: (options) => ({ ...options, cache: 'no-store' }),
        })
    );

const globalForDirectus = globalThis as unknown as {
    directus: ReturnType<typeof createDirectusClient> | undefined;
};
  
export const directus = globalForDirectus.directus ?? createDirectusClient();