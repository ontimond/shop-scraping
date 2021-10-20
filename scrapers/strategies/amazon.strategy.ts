import ShopItem from "../../interfaces/shop-item";
import { ScrapingStrategy } from "../../interfaces/scraping-strategy";
import ApifyApi from "../utils/apify.api";

/**
 * Amazon strategy
 */
class AmazonStrategy implements ScrapingStrategy {

    name: string = 'apify-amazon:api';

    async scrape(url: string): Promise<ShopItem> {
        const [data] = await this.runApifyAmazon(url);

        return {
            title: data.title,
            price: data.prices,
            image: data.itemDetail.images,
            availability: data.itemDetail.InStock
        };
    }

    runApifyAmazon(url: string): Promise<any> {
        return ApifyApi.runSyncGetDatasetItems('vaclavrut~amazon-crawler', this.createApifyAmazonInput(url));
    }

    createApifyAmazonInput(url: string): object {
        const [,asin] = url.match('.*/([a-zA-Z0-9]{10})(?:[/?]|$).*');
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