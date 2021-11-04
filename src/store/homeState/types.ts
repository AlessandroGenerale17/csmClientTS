export type PopularSnippet = {
    id: number;
    author: {
        name: string;
        id: number;
    };
    language: string;
    issue: boolean;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

export type HomeState = {
    popularSnippets: PopularSnippet[];
    issueSnippets: PopularSnippet[];
};

export type SavePopularSnippets = {
    type: 'SAVE_POPULAR_SNIPPETS';
    payload: PopularSnippet[];
};

export type HomeActions = SavePopularSnippets;
