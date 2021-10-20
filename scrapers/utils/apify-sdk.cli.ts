import { ApifyClient } from 'apify-client';

export function getApifyClient() {
    return new ApifyClient({
        token: process.env.APIFY_TOKEN,
    })
}