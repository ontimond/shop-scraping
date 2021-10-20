"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const local_directory_factory_1 = require("./scrapers/factories/local-directory.factory");
const shop_item_scraper_1 = require("./scrapers/shop-item.scraper");
dotenv_1.default.config();
const items = [
    'https://es.aliexpress.com/item/1005002198829169.html',
    'https://es.aliexpress.com/item/1005003235076719.html',
    'https://www.amazon.com/dp/B08RMSR66M/'
];
const factory = new local_directory_factory_1.LocalDirectoryFactory();
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (const item of items) {
        const strategy = factory.get(item);
        const shopItemScraper = new shop_item_scraper_1.ShopItemScraper(strategy);
        console.log('scraping: %s using %s', item, strategy.name);
        const shopItem = yield shopItemScraper.scrape(item);
        console.log('shop item: %s', shopItem.title);
    }
}))();
//# sourceMappingURL=index.js.map