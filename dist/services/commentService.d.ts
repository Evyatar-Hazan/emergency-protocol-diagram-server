export declare const getCommentsByNodeId: (nodeId: string) => Promise<({
    author: {
        id: string;
        email: string;
        name: string | null;
        picture: string | null;
        isAdmin: boolean;
    };
    replies: ({
        author: {
            id: string;
            email: string;
            name: string | null;
            picture: string | null;
            isAdmin: boolean;
        };
        replies: ({
            author: {
                id: string;
                email: string;
                name: string | null;
                picture: string | null;
                isAdmin: boolean;
            };
        } & {
            id: string;
            nodeId: string;
            content: string;
            authorId: string;
            parentCommentId: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: string;
        nodeId: string;
        content: string;
        authorId: string;
        parentCommentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
} & {
    id: string;
    nodeId: string;
    content: string;
    authorId: string;
    parentCommentId: string | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const createComment: (nodeId: string, content: string, authorId: string, parentCommentId?: string) => Promise<{
    author: {
        id: string;
        email: string;
        name: string | null;
        picture: string | null;
        isAdmin: boolean;
    };
} & {
    id: string;
    nodeId: string;
    content: string;
    authorId: string;
    parentCommentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateComment: (commentId: string, content: string) => Promise<{
    author: {
        id: string;
        email: string;
        name: string | null;
        picture: string | null;
        isAdmin: boolean;
    };
} & {
    id: string;
    nodeId: string;
    content: string;
    authorId: string;
    parentCommentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteComment: (commentId: string) => Promise<{
    id: string;
    nodeId: string;
    content: string;
    authorId: string;
    parentCommentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getCommentById: (commentId: string) => Promise<({
    author: {
        id: string;
        email: string;
        name: string | null;
        picture: string | null;
        isAdmin: boolean;
    };
} & {
    id: string;
    nodeId: string;
    content: string;
    authorId: string;
    parentCommentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
//# sourceMappingURL=commentService.d.ts.map