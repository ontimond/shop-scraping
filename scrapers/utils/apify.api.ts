import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://api.apify.com/v2/'
});

axiosClient.interceptors.request.use(function (config) {
    config.params = { token: process.env.APIFY_TOKEN };
    return config;
});

async function runSyncGetDatasetItems(actor: string, input: object) {
    const { data } = await axiosClient.post(`/acts/${actor}/run-sync-get-dataset-items`, input)
    return data;
}

export default { runSyncGetDatasetItems };