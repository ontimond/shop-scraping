"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopItemScraper = void 0;
class ShopItemScraper {
    constructor(strategy) {
        this.strategy = strategy;
    }
    scrape(url) {
        try {
            return this.strategy.scrape(url);
        }
        catch (error) {
            // console.error(error); 
        }
    }
}
exports.ShopItemScraper = ShopItemScraper;
//# sourceMappingURL=shop-item.scraper.js.map