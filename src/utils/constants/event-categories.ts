type EventCategories = {
    [key: string]: string; // Index signature
    TECHNICAL: string;
    NONTECHNICAL: string;
    GAMING: string;
};

export const EVENT_CATEGORIES: EventCategories = {
    'TECHNICAL': process.env.TECHNICAL_UUID_ID as string || "093f24d7-5454-456f-a7d7-3d3de272dc49",
    'NONTECHNICAL': process.env.NONTECHNICAL_UUID_ID as string || "17ebe1b0-b88e-4993-98e9-b29673963322",
    'GAMING': process.env.GAMING_UUID_ID as string || "d9f89ac6-6fb7-4736-8515-5064745a2c52",
};
