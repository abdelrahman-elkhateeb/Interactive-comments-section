import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from "react";
import data from "../data.json";
import type { AppData, Comment, CommentAction, User } from "../types";
import { commentReducer } from "./commentsReducer";

type CommentsContextValue = {
  comments: Comment[];
  currentUser: User;
  dispatch: Dispatch<CommentAction>;
}

const CommentContext = createContext<CommentsContextValue | null>(null);

const usersData: AppData = data;

const {
  comments: commentsData,
  currentUser,
} = usersData;

function getInitialComments(): Comment[] {
  try {
    const saved = localStorage.getItem('comments');
    return saved ? JSON.parse(saved) as Comment[] : commentsData;

  } catch (error) {
    console.error('Failed to parse comments from localStorage:', error);
    return commentsData;
  }
}

export function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, dispatch] = useReducer(commentReducer, getInitialComments());

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  return <CommentContext.Provider value={{ comments, currentUser, dispatch }}>
    {children}
  </CommentContext.Provider>
}

export function useComment() {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComment must be used inside <CommentProvider>")
  return ctx;
}