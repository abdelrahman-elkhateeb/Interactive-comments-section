import { useState, type FormEvent } from "react";
import type { BaseComment } from "../types";
import { useComment } from "../context/CommentsContext";
import CommentCard from "./CommentCard";
import EditForm from "./EditForm";

type CommentItemProps = {
  item: BaseComment;
  replyingTo?: string;
  onDelete: (id: number) => void; // App owns the single delete modal
};

// One comment OR reply, with its own edit state.
export default function CommentItem({ item, replyingTo, onDelete }: CommentItemProps) {
  const { currentUser, dispatch } = useComment();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const isOwn = currentUser.username === item.user.username;

  function startEdit() {
    setEditText(item.content);
    setIsEditing(true);
  }

  function handleEditSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editText.trim() === "") return;
    dispatch({ type: "edit", id: item.id, content: editText });
    setIsEditing(false);
  }

  return (
    <CommentCard
      item={item}
      replyingTo={replyingTo}
      isOwn={isOwn}
      onUpvote={() => dispatch({ type: "vote", id: item.id, rate: "upvote" })}
      onDownvote={() => dispatch({ type: "vote", id: item.id, rate: "downvote" })}
      onDelete={() => onDelete(item.id)}
      onEdit={startEdit}
      editSlot={
        isEditing ? (
          <EditForm
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onSubmit={handleEditSubmit}
          />
        ) : undefined
      }
    />
  );
}
