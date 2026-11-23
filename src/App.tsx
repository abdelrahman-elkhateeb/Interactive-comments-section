import { useComment } from "./context/CommentsContext";
import CommentCard from "./components/CommentCard";
import CommentForm from "./components/CommentForm";
import ReplyList from "./components/ReplyList";

import { Fragment, useState, type FormEvent } from "react";
import type { AppData } from "./types";
import data from "./data.json";

function App() {
  const usersData: AppData = data;
  const {
    currentUser,
  } = usersData;

  const { comments, dispatch } = useComment();
  const [text, setText] = useState("");

  function submitForm(e: FormEvent<HTMLFormElement>) {
    if (text.trim() === "") return;
    e.preventDefault();
    dispatch({ type: "add", content: text });
    setText("")
  }

  return (
    <main className="mx-auto flex max-w-[730px] flex-col gap-4 px-4 py-8 md:gap-5 md:py-16">
      {
        comments.map(comment =>
          <Fragment key={comment.id}>
            <CommentCard
              item={comment}
              isOwn={currentUser.username === comment.user.username}
              onUpvote={() => { dispatch({ type: "vote", id: comment.id, rate: "upvote" }) }}
              onDownvote={() => { dispatch({ type: "vote", id: comment.id, rate: "downvote" }) }}
              onDelete={() => { dispatch({ type: "delete", id: comment.id }) }}
              onEdit={() => { dispatch({ type: "edit", id: comment.id }) }}
            />
            {
              comment.replies.length > 0 && <ReplyList>
                {comment.replies.map(reply => <CommentCard
                  key={reply.id} replyingTo={reply.replyingTo}
                  item={reply}
                  isOwn={currentUser.username === reply.user.username}
                  onUpvote={() => { dispatch({ type: "vote", id: reply.id, rate: "upvote" }) }}
                  onDownvote={() => { dispatch({ type: "vote", id: reply.id, rate: "downvote" }) }}
                  onDelete={() => { dispatch({ type: "delete", id: reply.id }) }}
                />)}
              </ReplyList>
            }
          </Fragment>)
      }
      < CommentForm currentUser={currentUser} value={text} onChange={(e) => { setText(e.target.value) }} onSubmit={submitForm} />
    </main >
  );
}

export default App;
