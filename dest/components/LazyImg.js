"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class LazyImg extends HTMLElement {
    constructor() {
        super();
        this.shadow = null;
        this.img = null;
        this.loaded = false;
        this.setImgSrc = () => {
            if (this.loaded)
                return;
            const { top } = this.getBoundingClientRect();
            if (top < window.innerHeight) {
                this.img.setAttribute('src', this.getAttribute('src'));
                console.log('lazy-img-loaded');
                this.loaded = true;
                window.onscroll = null;
            }
        };
        this.shadow = this.attachShadow({ mode: 'open' });
        this.img = document.createElement('img');
        this.shadow.appendChild(this.img);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        console.log('lazy-img-change', name, oldVal, newVal);
        if (oldVal !== newVal) {
            if (name === 'src') {
                this.loaded && this.img.setAttribute(name, newVal);
            }
            else {
                this.img.setAttribute(name, newVal);
            }
        }
    }
    connectedCallback() {
        this.style.cssText = [
            'display: inline-block',
            'background: #F5F7FA'
        ].join('; ');
        this.img.setAttribute('width', this.hasAttribute('width') ? this.getAttribute('width') : '300');
        this.img.setAttribute('height', this.hasAttribute('height') ? this.getAttribute('height') : '200');
        this.setImgSrc();
        window.onscroll = (0, lodash_1.throttle)(this.setImgSrc, 200);
    }
    disconnectedCallback() { }
}
LazyImg.observedAttributes = [
    'src', 'width', 'height'
];
exports.default = LazyImg;
