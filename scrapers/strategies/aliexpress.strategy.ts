import ShopItem from "../../interfaces/shop-item";
import { ScrapingStrategy } from "../../interfaces/scraping-strategy";
import apifyCli from "../utils/apify-sdk.cli";

/**
 * Aliexpress strategy
 */
class AliexpressStrategy implements ScrapingStrategy {

    name: string = 'apify-aliexpress:sdk';

    async scrape(url: string): Promise<ShopItem> {
        const [data] = await this.runApifyAliexpress(url);

        return {
            title: data.title,
            price: data.prices,
            image: data.photos,
            availability: data.quantity
        };
    }

    async runApifyAliexpress(url: string): Promise<any> {
        const { defaultDatasetId } = await apifyCli.actor('tugkan/aliexpress-scraper').call(this.createApifyAliexpressInput(url));
        const { items } = await apifyCli.dataset(defaultDatasetId).listItems();
        return items;
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