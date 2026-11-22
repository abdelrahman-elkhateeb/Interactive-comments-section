import type { ReactNode } from "react";

// Indented column with the left line, for replies under a comment.
export default function ReplyList({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 border-l-2 border-grey-100 pl-4 md:ml-10 md:gap-5 md:pl-10">
      {children}
    </div>
  );
}
