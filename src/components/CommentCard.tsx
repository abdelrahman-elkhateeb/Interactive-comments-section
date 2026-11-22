import type { ReactNode } from "react";
import type { BaseComment } from "../types";
import Avatar from "./Avatar";
import ScoreControl from "./ScoreControl";
import ActionButtons from "./ActionButtons";

type CommentCardProps = {
  item: BaseComment;
  replyingTo?: string; // pass for replies to show "@username"
  isOwn: boolean;      // true when item belongs to the current user
  onUpvote?: () => void;
  onDownvote?: () => void;
  onReply?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  // When editing, pass the edit form here and it replaces the text.
  editSlot?: ReactNode;
};

export default function CommentCard({
  item,
  replyingTo,
  isOwn,
  onUpvote,
  onDownvote,
  onReply,
  onEdit,
  onDelete,
  editSlot,
}: CommentCardProps) {
  return (
    <article
      className="grid grid-cols-[auto_1fr] gap-4 rounded-lg bg-white p-4
                 [grid-template-areas:'header_header''body_body''score_actions']
                 md:grid-cols-[auto_1fr_auto] md:gap-x-6 md:p-6
                 md:[grid-template-areas:'score_header_actions''score_body_body']"
    >
      {/* Header */}
      <header className="flex items-center gap-4 [grid-area:header]">
        <Avatar user={item.user} />
        <span className="font-medium text-grey-800">{item.user.username}</span>
        {isOwn && (
          <span className="rounded-sm bg-purple-600 px-1.5 pb-0.5 text-sm font-medium text-white">
            you
          </span>
        )}
        <span>{item.createdAt}</span>
      </header>

      {/* Body */}
      <div className="[grid-area:body]">
        {editSlot ?? (
          <p className="leading-6">
            {replyingTo && (
              <span className="font-medium text-purple-600">@{replyingTo} </span>
            )}
            {item.content}
          </p>
        )}
      </div>

      {/* Score */}
      <div className="justify-self-start [grid-area:score] md:self-start">
        <ScoreControl score={item.score} onUpvote={onUpvote} onDownvote={onDownvote} />
      </div>

      {/* Actions */}
      <div className="self-center justify-self-end [grid-area:actions] md:self-start md:pt-2">
        <ActionButtons isOwn={isOwn} onReply={onReply} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </article>
  );
}
