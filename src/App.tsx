import { Fragment, useState, type FormEvent } from "react";
import { useComment } from "./context/CommentsContext";
import CommentItem from "./components/CommentItem";
import CommentForm from "./components/CommentForm";
import ReplyList from "./components/ReplyList";
import DeleteModal from "./components/DeleteModal";

function App() {
  const { comments, currentUser, dispatch } = useComment();

  const [text, setText] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim() === "") return;
    dispatch({ type: "add", content: text });
    setText("");
  }

  function confirmDelete() {
    if (deleteId === null) return;
    dispatch({ type: "delete", id: deleteId });
    setDeleteId(null);
  }

  return (
    <main className="mx-auto flex max-w-[730px] flex-col gap-4 px-4 py-8 md:gap-5 md:py-16">
      {comments.map((comment) => (
        <Fragment key={comment.id}>
          <CommentItem parentId={comment.id} item={comment} onDelete={setDeleteId} />

          {comment.replies.length > 0 && (
            <ReplyList>
              {comment.replies.map((reply) => (
                <CommentItem
                  parentId={comment.id}
                  key={reply.id}
                  item={reply}
                  replyingTo={reply.replyingTo}
                  onDelete={setDeleteId}
                />
              ))}
            </ReplyList>
          )}
        </Fragment>
      ))}

      <CommentForm
        currentUser={currentUser}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSubmit={submitForm}
      />

      <DeleteModal
        isOpen={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}

export default App;
