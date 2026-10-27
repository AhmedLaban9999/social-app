import { Button } from "flowbite-react";
import { useState, useContext } from "react";
import type { Post } from "../../types/posts";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import dayjs from "dayjs";
import { usePostActions } from "../../hooks/usePostActions";
import UserAvatar from "../ui/UserAvatar";
import UserLink from "../ui/UserLink";
import CommentSection from "../comment/CommentSection";

export default function PostFooter({ postdetail }: { postdetail: Post }) {
  const { userData } = useContext(AuthContext);
  const { likesCount, commentsCount, sharesCount, topComment, _id, likes, user } = postdetail;
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareText, setShareText] = useState("");

  const { toggleLike, sharePost } = usePostActions(_id);

  const mutate = (_postId?: string) => toggleLike.mutate();
  const isPending = toggleLike.isPending;
  const isSharing = sharePost.isPending;

  const handleShare = () => {
    sharePost.mutate(shareText, {
      onSuccess: () => {
        setShareText("");
        setShowShare(false);
      },
    });
  };

  return (
    <>
      <div className="px-4 pb-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <i className="fa-regular fa-thumbs-up text-blue-600 dark:text-blue-400"></i> {likesCount} likes
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <i className="fa-solid fa-retweet text-blue-600 dark:text-blue-400"></i> {sharesCount} shares
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <i className="fa-regular fa-comment text-blue-600 dark:text-blue-400"></i> {commentsCount} comments
          </span>
          <Link to={"/PostsDetails/" + _id} className="ms-auto whitespace-nowrap font-semibold text-blue-600 hover:underline dark:text-blue-400">
            View details
          </Link>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <i className="fa-regular fa-clock"></i> {dayjs(postdetail.createdAt).format("MMM D, h:mm A")}
        </p>
      </div>

      <div className="mx-2 sm:mx-4 flex gap-2 border-t border-gray-200 py-2 dark:border-gray-700">
        <Button onClick={() => mutate(_id)} disabled={isPending} color="light" className={`flex-1 border-0 ${userData && likes.includes(userData._id) ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "bg-white text-gray-600 dark:bg-transparent dark:text-gray-300"} hover:bg-blue-100 dark:hover:bg-gray-700`}>
          <i className="fa-regular fa-thumbs-up sm:me-2"></i> <span className="hidden sm:inline">Like</span>
        </Button>
        <Button color="light" className="flex-1 border-0 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-700">
          <i className="fa-regular fa-comment sm:me-2"></i> <span className="hidden sm:inline">Comment</span>
        </Button>
        <Button onClick={() => setShowShare(true)} color="light" className="flex-1 border-0 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-700">
          <i className="fa-solid fa-share-nodes sm:me-2"></i> <span className="hidden sm:inline">Share</span>
        </Button>
      </div>

      {topComment && !showComments && (
        <div className="mx-4 mb-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400">Top comment</p>
          <div className="flex items-start gap-3">
            <UserAvatar src={topComment?.commentCreator.photo} size="sm" userId={topComment.commentCreator._id} />
            <div className="flex-1 rounded-2xl bg-white px-4 py-2 dark:bg-gray-700">
              <UserLink userId={topComment.commentCreator._id} className="block text-sm font-bold text-gray-900 dark:text-white">
                {topComment.commentCreator.name}
              </UserLink>
              <p className="text-gray-700 dark:text-gray-200">{topComment.content}</p>
            </div>
          </div>
          <button onClick={() => setShowComments(true)} className="mt-3 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
            View all comments
          </button>
        </div>
      )}

      <CommentSection postId={_id} enabled={showComments} onOpen={() => setShowComments(true)} />

      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Share post</h2>
              <button onClick={() => setShowShare(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <textarea
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              rows={3}
              placeholder="Say something about this..."
              className="w-full resize-none rounded-2xl border border-gray-200 bg-slate-50 p-4 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowShare(false)} className="rounded-xl px-5 py-2.5 font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={() => handleShare()} disabled={isSharing} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700">
                <i className="fa-solid fa-share-nodes"></i> Share now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
