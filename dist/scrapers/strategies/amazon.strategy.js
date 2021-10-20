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
const apify_api_1 = __importDefault(require("../utils/apify.api"));
/**
 * Amazon strategy
 */
class AmazonStrategy {
    constructor() {
        this.name = 'apify-amazon:api';
    }
    scrape(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const [data] = yield this.runApifyAmazon(url);
            return {
                title: data.title,
                price: data.prices,
                image: data.itemDetail.images,
                availability: data.itemDetail.InStock
            };
        });
    }
    runApifyAmazon(url) {
        return apify_api_1.default.runSyncGetDatasetItems('vaclavrut~amazon-crawler', this.createApifyAmazonInput(url));
    }
    createApifyAmazonInput(url) {
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
exports.default = AmazonStrategy;
//# sourceMappingURL=amazon.strategy.js.map