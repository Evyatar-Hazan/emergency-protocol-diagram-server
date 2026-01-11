"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getComments = void 0;
const express_validator_1 = require("express-validator");
const commentService = __importStar(require("../services/commentService"));
const getComments = async (req, res) => {
    try {
        const { nodeId } = req.params;
        if (!nodeId) {
            res.status(400).json({ message: 'Node ID required' });
            return;
        }
        const comments = await commentService.getCommentsByNodeId(nodeId);
        res.json({ comments });
    }
    catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
};
exports.getComments = getComments;
const createComment = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { nodeId, content, parentCommentId } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }
        const comment = await commentService.createComment(nodeId, content, userId, parentCommentId);
        res.status(201).json({ comment });
    }
    catch (error) {
        console.error('Create comment error:', error);
        res.status(500).json({ message: 'Failed to create comment' });
    }
};
exports.createComment = createComment;
const updateComment = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user?.id;
        const comment = await commentService.getCommentById(commentId);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        if (comment.authorId !== userId && !req.user?.isAdmin) {
            res.status(403).json({ message: 'You can only edit your own comments' });
            return;
        }
        const updatedComment = await commentService.updateComment(commentId, content);
        res.json({ comment: updatedComment });
    }
    catch (error) {
        console.error('Update comment error:', error);
        res.status(500).json({ message: 'Failed to update comment' });
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user?.id;
        const comment = await commentService.getCommentById(commentId);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        if (comment.authorId !== userId && !req.user?.isAdmin) {
            res.status(403).json({ message: 'You can only delete your own comments' });
            return;
        }
        await commentService.deleteComment(commentId);
        res.json({ message: 'Comment deleted' });
    }
    catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({ message: 'Failed to delete comment' });
    }
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=commentController.js.map