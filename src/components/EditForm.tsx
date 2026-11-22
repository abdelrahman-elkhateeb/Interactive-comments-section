import type { ChangeEvent, FormEvent } from "react";

type EditFormProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

// Goes into CommentCard's editSlot. Fully controlled.
export default function EditForm({ value, onChange, onSubmit }: EditFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <textarea
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full resize-none rounded-lg border border-grey-100 px-6 py-3 text-grey-800
                   outline-none focus:border-purple-600 hover:border-purple-600"
      />
      <button
        type="submit"
        className="cursor-pointer self-end rounded-lg bg-purple-600 px-6 py-3 font-medium uppercase text-white hover:bg-purple-200"
      >
        Update
      </button>
    </form>
  );
}
