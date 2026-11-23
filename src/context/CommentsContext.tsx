import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import type { Comment, CommentAction, User } from "../types"
import { commentReducer } from "./commentsReducer";
import data from "../data.json";
import type { AppData } from "../types";

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

export function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, dispatch] = useReducer(commentReducer, commentsData);

  return <CommentContext.Provider value={{ comments, currentUser, dispatch }}>
    {children}
  </CommentContext.Provider>
}

export function useComment() {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComment must be used inside <CommentProvider>")
  return ctx;
}