import dotenv from 'dotenv'
import { LocalDirectoryFactory } from "./scrapers/factories/local-directory.factory";
import { ShopItemScraper } from "./scrapers/shop-item.scraper";
import AmazonStrategy from './scrapers/strategies/amazon.strategy';
import ScrapingBotStrategy from './scrapers/strategies/scraping-bot.strategy';

dotenv.config();

const items = [
    'https://es.aliexpress.com/item/1005002198829169.html',
    'https://es.aliexpress.com/item/1005003235076719.html',
    'https://www.amazon.com/dp/B08RMSR66M/',
    'https://partakefoods.com/products/soft-baked-cookie-variety-pack'
];

const factory = new LocalDirectoryFactory();

(async () => {
    for (const item of items) {

        const strategy = factory.get(item);
        const shopItemScraper = new ShopItemScraper(strategy);

        console.log('scraping: %s using %s', item, strategy.name);
        const shopItem = await shopItemScraper.scrape(item);
        console.log('shop item: %s', shopItem.title);
    }
})();