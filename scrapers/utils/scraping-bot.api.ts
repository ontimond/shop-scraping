import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://api.scraping-bot.io/scrape/',
});

axiosClient.interceptors.request.use(function (config) {
    config.headers.Authorization = `Basic ${new Buffer(`${process.env.SCRAPING_BOT_USERNAME}:${process.env.SCRAPING_BOT_TOKEN}`).toString("base64")}`;
    return config;
});

async function retail(url: string): Promise<any> {
    return axiosClient.post('/retail', {
        url,
        options: {
            useChrome: false,
            premiumProxy: true,
            waitForNetworkRequests: false,
        }
    });
}

export default {
    retail
};