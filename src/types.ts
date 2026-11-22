export type Image = {
  png: string;
  webp: string;
}

export type User = {
  image: Image;
  username: string;
}

export type BaseComment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
}

export type Reply = BaseComment & {
  replyingTo: string;
}

export type Comment = BaseComment & {
  replies: Reply[];
}

export type AppData = {
  currentUser: User;
  comments: Comment[];
}