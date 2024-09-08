type Types = {
    [key: string]: string; // Index signature
    ARTICLE: string;
    POETRY: string;
    ART: string;
    SHUTTERBUGS: string;
    REELLENS: string;
};

export enum ContentType {
    ARTICLE = "ARTICLE",
    POETRY = "POETRY",
    ART = "ART",
    SHUTTERBUGS = "SHUTTERBUGS",
    REELLENS = "REELLENS"
}

export const CONTENT_TYPES: Types = {
    ARTICLE: process.env.ARTICLE_FOLDER_ID as string,
    POETRY: process.env.POETRY_FOLDER_ID as string,
    ART: process.env.ART_FOLDER_ID as string,
    SHUTTERBUGS: process.env.SHUTTERBUGS_FOLDER_ID as string,
    REELLENS: process.env.REEL_LENS_FOLDER_ID as string
};
