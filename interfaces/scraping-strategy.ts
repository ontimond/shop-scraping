import ShopItem from "./shop-item";

export interface ScrapingStrategy {
  name: string;
  scrape(url: string): Promise<ShopItem>; 
}