import ShopItem from "../../interfaces/shop-item";
import { ScrapingStrategy } from "../../interfaces/scraping-strategy";
import apifyCli from "../utils/apify-sdk.cli";

/**
 * Amazon strategy
 */
class AmazonStrategy implements ScrapingStrategy {

    name: string = 'apify-amazon:sdk';

    async scrape(url: string): Promise<ShopItem> {
        const [data] = await this.runApifyAmazon(url);

        return {
            title: data.title,
            price: data.prices,
            image: data.itemDetail.images,
            availability: data.itemDetail.InStock
        };
    }

    async runApifyAmazon(url: string): Promise<any> {
        const run = await apifyCli.actor('vaclavrut/Amazon-crawler').call(this.createApifyAmazonInput(url));
        const { items } = await apifyCli.dataset(run.defaultDatasetId).listItems();
        return items;
    }

    createApifyAmazonInput(url: string): object {
        const [, asin] = url.match('.*/([a-zA-Z0-9]{10})(?:[/?]|$).*');
        return {
            "scraper": false,
            "country": "US",
            "category": "aps",
            "searchType": "asins",
            "search": asin,
            "proxy": {
                "useApifyProxy": true
            },
            "maxResults": 1,
            "maxReviews": 0
        };
    }

}

export default AmazonStrategy;