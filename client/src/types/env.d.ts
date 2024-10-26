// env.d.ts
interface ImportMetaEnv {
    readonly CLIENT_ID: string;
    readonly REDIRECT_URI: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}