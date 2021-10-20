"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDirectoryFactory = void 0;
const aliexpress_strategy_1 = __importDefault(require("../strategies/aliexpress.strategy"));
const amazon_strategy_1 = __importDefault(require("../strategies/amazon.strategy"));
class LocalDirectoryFactory {
    constructor() {
        this.directory = [
            {
                strategy: new amazon_strategy_1.default(),
                domains: [
                    '(.*)\.amazon\.(com|co\.uk|de|es|fr|it|in|ca|co\.jp|ae|sa|com\.br|com\.mx|sg|com\.tr|nl|com\.au|se)',
                ],
            },
            {
                strategy: new aliexpress_strategy_1.default(),
                domains: [
                    '(.*)\.aliexpress\.com'
                ],
            }
        ];
    }
    get(url) {
        const response = this.directory.find(({ domains }) => domains.some(domain => url.match(domain)));
        if (!response)
            throw Error();
        return response.strategy;
    }
}
exports.LocalDirectoryFactory = LocalDirectoryFactory;
//# sourceMappingURL=local-directory.factory.js.map