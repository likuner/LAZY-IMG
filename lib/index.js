"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyImgList = exports.LazyImg = void 0;
const LazyImg_1 = __importDefault(require("./components/LazyImg"));
exports.LazyImg = LazyImg_1.default;
const LazyImgList_1 = __importDefault(require("./components/LazyImgList"));
exports.LazyImgList = LazyImgList_1.default;
customElements.define('lazy-img', LazyImg_1.default);
customElements.define('lazy-load-list', LazyImgList_1.default);
