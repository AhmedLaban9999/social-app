import { useState } from "react";
import { Link } from "react-router";
import { useSuggestions } from "../../hooks/useSuggestions";
import { useFollowUser } from "../../hooks/useFollowUser";
import FriendCard from "./FriendCard";



export default function SuggestedFriends() {
     const [search, setSearch] = useState("");
    const { friends } = useSuggestions(search, 5)
    const { mutate } = useFollowUser()


 

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <i className="fa-solid fa-user-group text-blue-600 dark:text-blue-400"></i> Suggested Friends
        </h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-sm font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {friends.length}
        </span>
      </div>

      <div className="relative mb-4">
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search friends..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 ps-11 pe-4 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        {friends.map((friend) => (
          <FriendCard
            key={friend._id}
            friend={friend}
            variant="compact"
            onFollow={(id) => mutate(id)}
          />
        ))}
      </div>

      <Link to="/Suggestions" className="mt-4 block w-full rounded-xl border border-gray-200 bg-gray-50 py-2 text-center font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
        View more
      </Link>
    </div>
  )
}