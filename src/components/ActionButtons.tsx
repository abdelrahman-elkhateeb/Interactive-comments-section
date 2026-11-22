type ActionButtonsProps = {
  isOwn: boolean;
  onReply?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

// Own items: Delete + Edit. Others' items: Reply.
export default function ActionButtons({ isOwn, onReply, onEdit, onDelete }: ActionButtonsProps) {
  if (isOwn) {
    return (
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onDelete}
          className="flex cursor-pointer items-center gap-2 font-medium text-pink-400 hover:text-pink-200"
        >
          <img src="/images/icon-delete.svg" alt="" /> Delete
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="flex cursor-pointer items-center gap-2 font-medium text-purple-600 hover:text-purple-200"
        >
          <img src="/images/icon-edit.svg" alt="" /> Edit
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onReply}
      className="flex cursor-pointer items-center gap-2 font-medium text-purple-600 hover:text-purple-200"
    >
      <img src="/images/icon-reply.svg" alt="" /> Reply
    </button>
  );
}
