
import type { Post } from "../../types/posts";
import { Avatar, Card, Dropdown, DropdownItem,Textarea,Button } from "flowbite-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostFooter from "./PostFooter";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, updatePost as updatePostApi, toggleBookmark } from "../../api/posts.api";
import { queryKeys } from "../../api/queryKeys";

import { Link } from 'react-router'


dayjs.extend(relativeTime);
interface PostCardProps {
  element: Post;


}

export default function PostCard({element}: PostCardProps) {
   const { userData } = useContext(AuthContext)
  const {sharedPost, _id, image, body, createdAt,bookmarked, user: { name, photo, _id: userId } } = element

    
    const queries=useQueryClient()
   function handleDeletPost(id:string){
    
  return deletePost(id)

    }
const{mutate:handleDelete } = useMutation({

mutationFn: handleDeletPost,
onSuccess:()=>{
   queries.invalidateQueries({ queryKey: queryKeys.posts })
}

})

const [isEditing, setIsEditing] = useState(false);
const [edittext,setedittext]=useState('')


function updatePost(){
  const formdata= new FormData()
  formdata.append('body',edittext)
  return updatePostApi(_id, formdata)

}
 const { mutate: handleUpdate, isPending: isUpdating } =useMutation({
  mutationFn:updatePost,
  onSuccess:()=>{
    setIsEditing(false)
    queries.invalidateQueries({queryKey:queryKeys.posts})
       queries.invalidateQueries({ queryKey: queryKeys.postDetailsAll })
  }
 })
 const {mutate} =useMutation({
  mutationFn:savepost,
  onSuccess:()=>{
    queries.invalidateQueries({queryKey:queryKeys.posts})
    queries.invalidateQueries({ queryKey: queryKeys.bookmarks })
  }
 })
 function savepost(){
return toggleBookmark(_id)
 }
return(<> 
    <Card
      className=" w-full overflow-hidden"
      theme={{ root: { children: "flex flex-col p-0" } }}
    >
    
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <Avatar img={photo} rounded size="md" />
          <div>
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-900 dark:text-white">
                {name}
              </span>
           
            </p>
 
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>{dayjs(createdAt).fromNow()}</span>
              <span>·</span>
      
      <i className="fa-solid fa-earth-americas"></i>
              <span>Public</span>
            </div>
          </div>
        </div>

        <Dropdown
          inline
          arrowIcon={false}
    label={<i className="fa-solid fa-ellipsis text-gray-500 text-lg"></i>}
        >
           <DropdownItem onClick={() => mutate()}>
  <i className={`${bookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark me-3 w-4`}></i>
  {bookmarked ? 'Unsave post' : 'Save post'}
</DropdownItem>
          {userId == userData?._id && <><DropdownItem  onClick={() => { setIsEditing(true); setedittext(body ?? '') }} >Edit</DropdownItem>
           <DropdownItem onClick={()=>handleDelete(_id)}>Delete</DropdownItem></>  }
          
  
        </Dropdown>
      </div>

  {isEditing ? (
  <div className="px-4 pb-3">
    <Textarea
      rows={4}
      value={edittext}
      onChange={(e) => setedittext(e.target.value)}
      className="rounded-xl"
    />
    <div className="mt-3 flex justify-end gap-2">
      <Button color="light" pill size="sm" onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
      <Button pill size="sm" onClick={() => handleUpdate()} disabled={isUpdating}>
        Save
      </Button>
    </div>
  </div>
) : (
  body && <p className="px-4 pb-3 text-gray-800 dark:text-gray-200">{body}</p>
)}
      {image && <img src={image} alt="post" className="w-full object-cover" />}

{sharedPost && (
  <div className="mx-4 mb-3 overflow-hidden rounded-2xl border border-gray-200 bg-slate-50 dark:border-gray-700 dark:bg-gray-900">
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Avatar img={sharedPost.user.photo} rounded size="sm" />
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{sharedPost.user.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">@{sharedPost.user.username}</p>
        </div>
      </div>
      <Link
        to={`/PostsDetails/${sharedPost._id}`}
        className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
      >
        Original Post <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
      </Link>
    </div>
    {sharedPost.body && <p className="px-4 pb-3 text-gray-800 dark:text-gray-200">{sharedPost.body}</p>}
    {sharedPost.image && <img src={sharedPost.image} alt="original" className="w-full object-cover" />}
  </div>
)}
     <PostFooter postdetail={element}/>
    
    </Card>
 </> );
}