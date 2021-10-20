
import ShopItem from "../../interfaces/shop-item";
import { ScrapingStrategy } from "../../interfaces/scraping-strategy";
import axios from "axios";
import scrapingBotApi from "../utils/scraping-bot.api";

/**
 * Scraping bot strategy
 */
class ScrapingBotStrategy implements ScrapingStrategy {

    name: string = 'scraping-bot:api';

    async scrape(url: string): Promise<ShopItem> {
        const [{ error, data }] = await this.runScrapingBot(url);

        return {
            title: data.title,
            price: data.price,
            image: data.image,
            availability: data.isInStock
        };
    }

    async runScrapingBot(url: string): Promise<any> {
        return scrapingBotApi.retail(url);
    }

}

export default ScrapingBotStrategy;