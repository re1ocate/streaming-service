export function createElement(template: string): DocumentFragment{
    const range  = document.createRange();
    const fragment = range.createContextualFragment(template);
    return fragment
}
