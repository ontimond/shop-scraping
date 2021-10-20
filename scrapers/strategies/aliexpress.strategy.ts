import ShopItem from "../../interfaces/shop-item";
import { ScrapingStrategy } from "../../interfaces/scraping-strategy";
import ApifyApi from "../utils/apify.api";

/**
 * Aliexpress strategy
 */
class AliexpressStrategy implements ScrapingStrategy {

    name: string = 'apify-aliexpress:api';

    async scrape(url: string): Promise<ShopItem> {
        const [data] = await this.runApifyAliexpress(url);

        return {
            title: data.title,
            price: data.prices,
            image: data.photos,
            availability: data.quantity
        };
    }

    runApifyAliexpress(url: string): Promise<any> {
        return ApifyApi.runSyncGetDatasetItems('tugkan~aliexpress-scraper', this.createApifyAliexpressInput(url));
    }

    createApifyAliexpressInput(url): object {
        return {
            "startUrls": [
                {
                    "url": url
                }
            ],
            "language": "en_US",
            "shipTo": "US",
            "currency": "USD",
            "includeDescription": false,
            "proxy": {
                "useApifyProxy": true
            }
        }
    }

}

export default AliexpressStrategy;