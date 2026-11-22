import type { User } from "../types";

type AvatarProps = {
  user: User;
  size?: "sm" | "md";
};

export default function Avatar({ user, size = "sm" }: AvatarProps) {
  const sizeClass = size === "sm" ? "size-8" : "size-10";
  return (
    <picture>
      <source srcSet={user.image.webp} type="image/webp" />
      <img
        src={user.image.png}
        alt={user.username}
        className={`${sizeClass} rounded-full`}
      />
    </picture>
  );
}
