import { ScrapingStrategy } from "./scraping-strategy";

export interface ScrapingStrategyFactory {
    get(url: string): ScrapingStrategy;
}