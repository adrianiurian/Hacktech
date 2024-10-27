// declarations.d.ts
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.webp' {
    const content: string;
    export default content;
}