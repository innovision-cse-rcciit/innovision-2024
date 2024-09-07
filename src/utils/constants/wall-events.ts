type ContentTypes = {
    [key: string]: string; // Index signature
    ARTICLE: string;
    POETRY: string;
    ART: string;
    SHUTTERBUGS: string;
    REELLENS: string;
};

export const CONTENT_TYPES: ContentTypes = {
    ARTICLE: process.env.ARTICLE_FOLDER_ID as string,
    POETRY: process.env.POETRY_FOLDER_ID as string,
    ART: process.env.ART_FOLDER_ID as string,
    SHUTTERBUGS: process.env.SHUTTERBUGS_FOLDER_ID as string,
    REELLENS: process.env.REEL_LENS_FOLDER_ID as string
};
