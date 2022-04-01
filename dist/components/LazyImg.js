"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class LazyImg extends HTMLElement {
    constructor() {
        super();
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
        this.shadow.innerHTML = `
      <style>
        :host{
          display: inline-block;
          background: #F5F7FA;
        }
      </style>
    `;
        this.shadow.appendChild(this.img);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        console.log('lazy-img-changed', name, oldVal, newVal);
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
        this.img.setAttribute('width', this.hasAttribute('width') ? this.getAttribute('width') : '300');
        this.img.setAttribute('height', this.hasAttribute('height') ? this.getAttribute('height') : '200');
        this.setImgSrc();
        window.onscroll = (0, lodash_1.throttle)(this.setImgSrc, 200);
    }
    disconnectedCallback() { }
}
LazyImg.observedAttributes = ['src', 'width', 'height'];
exports.default = LazyImg;
