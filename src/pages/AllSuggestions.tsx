import { Link } from 'react-router'
import { useState } from 'react';
import { useAllSuggestions } from '../hooks/useAllSuggestions'
import FriendCard from '../components/friends/FriendCard'


export default function AllSuggestions() {
  const [search, setSearch] = useState('')

  const { friends, fetchNextPage, hasNextPage, isFetchingNextPage } = useAllSuggestions(search, 20)

   return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <Link
        to="/feed"
        className="mb-4 inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-2 font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <i className="fa-solid fa-arrow-left"></i> Back to feed
      </Link>

      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      
        <div className="mb-4 flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <i className="fa-solid fa-user-group text-blue-600"></i> All Suggested Friends
          </h1>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-semibold text-gray-600">
            {friends.length}
          </span>
        </div>

      
        <div className="relative mb-5">
          <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
          <input value={search}
            type="text"
            placeholder="Search by name or username..."
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 ps-11 pe-4 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

    
        <div className="grid gap-4 md:grid-cols-2">
         {friends.map((el)=>{
          return <FriendCard key={el._id} friend={el} variant="card" />
         })}

        
        </div>

{hasNextPage &&(<button
    onClick={() => fetchNextPage()}
    disabled={isFetchingNextPage}
    className="mt-5 w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-60">
    {isFetchingNextPage ? "Loading..." : "Load more users"}
  </button>
)}
      </div>
    </div>
  )
}