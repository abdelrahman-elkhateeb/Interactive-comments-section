import { useState, type FormEvent } from "react";
import type { BaseComment } from "../types";
import { useComment } from "../context/CommentsContext";
import CommentCard from "./CommentCard";
import EditForm from "./EditForm";
import CommentForm from "./CommentForm";

type CommentItemProps = {
  item: BaseComment;
  replyingTo?: string;
  parentId: number;
  onDelete: (id: number) => void; // App owns the single delete modal
};

// One comment OR reply, with its own edit state.
export default function CommentItem({ item, parentId, replyingTo, onDelete }: CommentItemProps) {
  const { currentUser, dispatch } = useComment();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

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

  function handleReplySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (replyText.trim() === "") return;
    dispatch({
      type: "reply",
      commentId: parentId,
      content: replyText,
      replyingTo: item.user.username
    });
    setReplyText("");
    setIsReplying(false);
  }

  return (
    <>
      <CommentCard
        item={item}
        replyingTo={replyingTo}
        isOwn={isOwn}
        onUpvote={() => dispatch({ type: "vote", id: item.id, rate: "upvote" })}
        onDownvote={() => dispatch({ type: "vote", id: item.id, rate: "downvote" })}
        onDelete={() => onDelete(item.id)}
        onEdit={startEdit}
        onReply={() => setIsReplying(true)}
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
      {
        isReplying && <CommentForm
          value={replyText}
          currentUser={currentUser}
          onChange={(e) => setReplyText(e.target.value)}
          onSubmit={handleReplySubmit}
          buttonLabel="reply"
        />
      }
    </>
  );
}
