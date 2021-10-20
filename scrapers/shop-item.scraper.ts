import { ScrapingStrategy } from "../interfaces/scraping-strategy";
import ShopItem from "../interfaces/shop-item";

export class ShopItemScraper {
    constructor(private strategy: ScrapingStrategy) {
    }

    scrape(url: string): Promise<ShopItem> {
        try {
            return this.strategy.scrape(url);
        } catch (error) {
           // console.error(error); 
        }
    }

}