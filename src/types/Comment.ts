export type Comment = {
    id: number;
    userId: number;
    snippetId: number;
    text: string;
    user: {
        name: string;
    };
    createdAt: Date;
};
