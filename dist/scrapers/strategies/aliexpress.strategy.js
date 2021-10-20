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
 * Aliexpress strategy
 */
class AliexpressStrategy {
    constructor() {
        this.name = 'apify-aliexpress:api';
    }
    scrape(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const [data] = yield this.runApifyAliexpress(url);
            return {
                title: data.title,
                price: data.prices,
                image: data.photos,
                availability: data.quantity
            };
        });
    }
    runApifyAliexpress(url) {
        return apify_api_1.default.runSyncGetDatasetItems('tugkan~aliexpress-scraper', this.createApifyAliexpressInput(url));
    }
    createApifyAliexpressInput(url) {
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
        };
    }
}
exports.default = AliexpressStrategy;
//# sourceMappingURL=aliexpress.strategy.js.map