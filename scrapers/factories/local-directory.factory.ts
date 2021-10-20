import { ScrapingStrategy } from "../../interfaces/scraping-strategy";
import { ScrapingStrategyFactory } from "../../interfaces/scraping-strategy-factory";
import AliexpressStrategy from "../strategies/aliexpress.strategy";
import AmazonStrategy from "../strategies/amazon.strategy";
import ScrapingBotStrategy from "../strategies/scraping-bot.strategy";

type StrategyDirectory = Array<{ strategy: ScrapingStrategy; domains: string[]; }>

export class LocalDirectoryFactory implements ScrapingStrategyFactory {

    directory: StrategyDirectory = [
        {
            strategy: new AmazonStrategy(),
            domains: [
                '(.*)\.amazon\.(com|co\.uk|de|es|fr|it|in|ca|co\.jp|ae|sa|com\.br|com\.mx|sg|com\.tr|nl|com\.au|se)',
            ],
        },
        {
            strategy: new AliexpressStrategy(),
            domains: [
                '(.*)\.aliexpress\.com'
            ],
        }
    ];

    get(url: string): ScrapingStrategy {
        const response = this.directory.find(({ domains }) => domains.some(domain => url.match(domain)));

        return response?.strategy ?? new ScrapingBotStrategy();
    }

}