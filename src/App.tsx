import CommentCard from "./components/CommentCard";
import CommentForm from "./components/CommentForm";
import ReplyList from "./components/ReplyList";
import data from "./data.json";
import type { AppData } from "./types";
import { Fragment } from "react";

function App() {
  const usersData: AppData = data;
  const {
    comments,
    currentUser
  } = usersData;

  return (
    <main className="mx-auto flex max-w-[730px] flex-col gap-4 px-4 py-8 md:gap-5 md:py-16">
      {
        comments.map(comment =>
          <Fragment key={comment.id}>
            <CommentCard item={comment} isOwn={currentUser.username === comment.user.username} />
            {
              comment.replies.length > 0 && <ReplyList>
                {comment.replies.map(reply => <CommentCard key={reply.id} replyingTo={reply.replyingTo} item={reply} isOwn={currentUser.username === reply.user.username} />)}
              </ReplyList>
            }
          </Fragment>)
      }
      < CommentForm currentUser={currentUser} value={""} onChange={() => { }} onSubmit={() => { }} />
    </main >
  );
}

export default App;
