type ContentTypes = {
    [key: string]: string; // Index signature
    ARTICLE: string;
    POETRY: string;
    ART: string;
};

export const CONTENT_TYPES: ContentTypes = {
    ARTICLE: process.env.ARTICLE_FOLDER_ID as string,
    POETRY: process.env.POETRY_FOLDER_ID as string,
    ART: process.env.ART_FOLDER_ID as string,
};
