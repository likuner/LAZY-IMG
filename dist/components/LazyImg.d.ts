declare class LazyImg extends HTMLElement {
    private shadow;
    private img;
    private done;
    private observer;
    constructor();
    static observedAttributes: string[];
    attributeChangedCallback(name: any, oldVal: any, newVal: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private init;
    get isInViewport(): boolean;
    get isSupportIntersectionObserver(): boolean;
    createIntersectionObserver: () => void;
    handleEmit: (eventName: string) => void;
    handleLoad: () => void;
    handleError: () => void;
}
export default LazyImg;
