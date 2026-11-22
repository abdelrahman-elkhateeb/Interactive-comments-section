import type { ChangeEvent, FormEvent } from "react";
import type { User } from "../types";
import Avatar from "./Avatar";

type CommentFormProps = {
  currentUser: User;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  buttonLabel?: string; // "Send" | "Reply"
  placeholder?: string;
};

// Used for new comments and replies. Fully controlled: the parent owns the text.
export default function CommentForm({
  currentUser,
  value,
  onChange,
  onSubmit,
  buttonLabel = "Send",
  placeholder = "Add a comment...",
}: CommentFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-lg bg-white p-4
                 [grid-template-areas:'text_text''avatar_button']
                 md:grid-cols-[auto_1fr_auto] md:items-start md:p-6
                 md:[grid-template-areas:'avatar_text_button']"
    >
      <div className="[grid-area:avatar]">
        <Avatar user={currentUser} size="md" />
      </div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-lg border border-grey-100 px-6 py-3 text-grey-800
                   outline-none [grid-area:text] focus:border-purple-600 hover:border-purple-600"
      />
      <button
        type="submit"
        className="cursor-pointer justify-self-end rounded-lg bg-purple-600 px-7 py-3 font-medium uppercase
                   text-white [grid-area:button] hover:bg-purple-200"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
