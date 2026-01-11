"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentById = exports.deleteComment = exports.updateComment = exports.createComment = exports.getCommentsByNodeId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCommentsByNodeId = async (nodeId) => {
    return prisma.comment.findMany({
        where: { nodeId, parentCommentId: null },
        include: {
            author: {
                select: { id: true, email: true, name: true, picture: true, isAdmin: true },
            },
            replies: {
                include: {
                    author: {
                        select: { id: true, email: true, name: true, picture: true, isAdmin: true },
                    },
                    replies: {
                        include: {
                            author: {
                                select: { id: true, email: true, name: true, picture: true, isAdmin: true },
                            },
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getCommentsByNodeId = getCommentsByNodeId;
const createComment = async (nodeId, content, authorId, parentCommentId) => {
    return prisma.comment.create({
        data: {
            nodeId,
            content,
            authorId,
            parentCommentId,
        },
        include: {
            author: {
                select: { id: true, email: true, name: true, picture: true, isAdmin: true },
            },
        },
    });
};
exports.createComment = createComment;
const updateComment = async (commentId, content) => {
    return prisma.comment.update({
        where: { id: commentId },
        data: { content },
        include: {
            author: {
                select: { id: true, email: true, name: true, picture: true, isAdmin: true },
            },
        },
    });
};
exports.updateComment = updateComment;
const deleteComment = async (commentId) => {
    return prisma.comment.delete({
        where: { id: commentId },
    });
};
exports.deleteComment = deleteComment;
const getCommentById = async (commentId) => {
    return prisma.comment.findUnique({
        where: { id: commentId },
        include: {
            author: {
                select: { id: true, email: true, name: true, picture: true, isAdmin: true },
            },
        },
    });
};
exports.getCommentById = getCommentById;
//# sourceMappingURL=commentService.js.map