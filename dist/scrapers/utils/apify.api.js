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
const axios_1 = __importDefault(require("axios"));
const axiosClient = axios_1.default.create({
    baseURL: 'https://api.apify.com/v2/'
});
axiosClient.interceptors.request.use(function (config) {
    config.params = { token: process.env.APIFY_TOKEN };
    return config;
});
function runSyncGetDatasetItems(actor, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axiosClient.post(`/acts/${actor}/run-sync-get-dataset-items`, input);
        return data;
    });
}
exports.default = { runSyncGetDatasetItems };
//# sourceMappingURL=apify.api.js.map