"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class LazyImg extends HTMLElement {
    constructor() {
        super();
        this.loaded = false;
        this.setImgSrc = (0, utils_1.throttle)(() => {
            if (this.loaded)
                return;
            const { top } = this.getBoundingClientRect();
            if (top < window.innerHeight) {
                this.img.setAttribute('src', this.getAttribute('src'));
                this.shadow.appendChild(this.img);
                this.loaded = true;
                this.removeScrollListener();
            }
        }, 200);
        this.handleLoad = (e) => {
            this.dispatchEvent(new CustomEvent('lazyload', {
                bubbles: true,
                composed: true,
                detail: {
                    target: this,
                    src: this.getAttribute('src')
                }
            }));
        };
        this.handleError = (e) => {
            this.dispatchEvent(new CustomEvent('lazyerror', {
                bubbles: true,
                composed: true,
                detail: {
                    target: this,
                    src: this.getAttribute('src')
                }
            }));
        };
        this.removeScrollListener = () => {
            window.removeEventListener('scroll', this.setImgSrc);
        };
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `
      <style>
        :host{
          display: inline-block;
          background: #F5F7FA;
        }
        img{
          width: 100%;
          height: 100%;
        }
      </style>
    `;
        this.img = document.createElement('img');
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            if (name === 'src') {
                this.loaded && this.img.setAttribute(name, newVal);
            }
            else if (name === 'alt') {
                this.img.setAttribute(name, newVal);
            }
            else {
                this.style.setProperty(name, (0, utils_1.getValWithUnit)(newVal));
            }
        }
    }
    connectedCallback() {
        if (!this.hasAttribute('width') && !this.hasAttribute('height')) {
            this.style.setProperty('width', '300px');
            this.style.setProperty('height', '200px');
        }
        this.img.onload = this.handleLoad;
        this.img.onerror = this.handleError;
        window.addEventListener('scroll', this.setImgSrc);
        this.setImgSrc();
    }
    disconnectedCallback() {
        if (!this.loaded) {
            this.removeScrollListener();
        }
        this.img.onload = null;
        this.img.onerror = null;
    }
}
LazyImg.observedAttributes = ['src', 'alt', 'width', 'height'];
exports.default = LazyImg;
