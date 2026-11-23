import type { AppData, Comment, CommentAction } from "../types";
import data from "../data.json"

export function commentReducer(state: Comment[], action: CommentAction): Comment[] {

  const usersData: AppData = data;
  const {
    currentUser,
  } = usersData;

  switch (action.type) {
    case "vote": {
      const change = action.rate === "upvote" ? 1 : -1;

      return state.map(comment => (
        comment.id === action.id ?
          { ...comment, score: comment.score + change }
          : {
            ...comment, replies: comment.replies.map(
              reply => (action.id === reply.id ? { ...reply, score: reply.score + change } : reply))
          }
      ));
    }

    case "add": {
      const newComment: Comment = {
        id: Math.floor(100000 + Math.random() * 900000),
        content: action.content,
        score: 0,
        user: currentUser,
        replies: [],
        createdAt: "just now",
      }
      return [...state, newComment]
    }

    case "delete": {
      return state.filter(comment => comment.id !== action.id)
        .map(comment => (
          {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== action.id)
          }
        ))
    }

    case "edit": {
      return state.map(comment => comment.id === action.id ?
        { ...comment, content: action.content } :
        {
          ...comment, replies: comment.replies.map(reply => action.id === reply.id ? { ...reply, content: action.content } :
            reply)
        })
    }
  }
}