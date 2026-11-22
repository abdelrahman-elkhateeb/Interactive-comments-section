type DeleteModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({ isOpen, onCancel, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="flex w-full max-w-[400px] flex-col gap-4 rounded-lg bg-white p-6 md:p-8"
      >
        <h2 id="delete-title" className="text-xl font-medium text-grey-800 md:text-2xl">
          Delete comment
        </h2>
        <p className="leading-6">
          Are you sure you want to delete this comment? This will remove the comment and can't be
          undone.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 cursor-pointer rounded-lg bg-grey-500 py-3 font-medium uppercase text-white hover:opacity-70"
          >
            No, cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded-lg bg-pink-400 py-3 font-medium uppercase text-white hover:bg-pink-200"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
