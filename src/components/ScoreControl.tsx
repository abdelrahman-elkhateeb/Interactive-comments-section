type ScoreControlProps = {
  score: number;
  onUpvote?: () => void;
  onDownvote?: () => void;
};

// Mobile: horizontal pill. Desktop (md+): vertical column.
export default function ScoreControl({ score, onUpvote, onDownvote }: ScoreControlProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-grey-50 px-3 py-2 md:w-10 md:flex-col md:gap-3 md:px-0 md:py-3">
      <button
        type="button"
        onClick={onUpvote}
        aria-label="Upvote"
        className="group cursor-pointer p-1"
      >
        <img src="/images/icon-plus.svg" alt="" className="opacity-60 group-hover:opacity-100" />
      </button>
      <span className="font-medium text-purple-600">{score}</span>
      <button
        type="button"
        onClick={onDownvote}
        aria-label="Downvote"
        className="group cursor-pointer p-1"
      >
        <img src="/images/icon-minus.svg" alt="" className="opacity-60 group-hover:opacity-100" />
      </button>
    </div>
  );
}
