import { useState } from "react";
import { Button, Card, Dropdown, DropdownItem, Textarea } from "flowbite-react";
import { type EmojiClickData } from "emoji-picker-react";
import Swal from "sweetalert2";
import { useCreatePost } from "../../hooks/useCreatePost";
import UserAvatar from "../ui/UserAvatar";
import EmojiToggle from "../ui/EmojiToggle";
import MediaUploadInput from "../ui/MediaUploadInput";


interface CreatePostProps {
  name: string;
  photo: string;
   
}
 const privacyIcons: Record<string, string> = {
  Public: 'fa-solid fa-earth-americas',
  Followers: 'fa-solid fa-user-group',
  'Only me': 'fa-solid fa-lock',
}

export default function CreatePost({ name, photo }: CreatePostProps) {

  const [privacy, setPrivacy] = useState("Public");
  const [showEmoji, setShowEmoji] = useState(false);
const [content,setcontent]=useState<string>('')
const [picture,setpicture]=useState<File | null>(null)

  function handleEmoji(emojiData: EmojiClickData) {
    setcontent((prev) => prev + emojiData.emoji);
  }
  const createPostMutation = useCreatePost()
  function mutate() {
    const formData = new FormData()
    if (content.trim()) formData.append('body', content)
    if (picture) formData.append('image', picture)
    createPostMutation.mutate(formData, {
      onSuccess: (res) => {
        setcontent('')
        setpicture(null)
        setShowEmoji(false)
        Swal.fire({
          title: 'success!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'cool',
          timer: 1000,
        })
      },
    })
  }
 

  return (
    <Card className="w-full max-w-2xl">
    
      <div className="flex items-center gap-3">
        <UserAvatar src={photo} size="md" />
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{name}</p>
          <Dropdown
            inline
            label={
              <span className="mt-1 flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
               <i className={privacyIcons[privacy]}></i> {privacy} 
              </span>
            }
          >
          <DropdownItem onClick={() => setPrivacy("Public")}>Public</DropdownItem>
<DropdownItem onClick={() => setPrivacy("Followers")}>Followers</DropdownItem>
<DropdownItem onClick={() => setPrivacy("Only me")}>Only me</DropdownItem>
          </Dropdown>
        </div>
      </div>

      
      <Textarea
        rows={5}
        value={content}
     onChange={(e)=>setcontent(e.target.value)}
        placeholder={`What's on your mind, ${name.split(" ")[0]}?`}
        className="rounded-2xl bg-gray-50 p-4"
      />

      
      <MediaUploadInput value={picture} onChange={setpicture} variant="post" mode="preview" />

      <EmojiToggle
        open={showEmoji}
        onToggle={() => setShowEmoji(!showEmoji)}
        onEmojiSelect={handleEmoji}
        variant="post"
        mode="picker"
      />

      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <div className="flex items-center gap-2">
          <MediaUploadInput value={picture} onChange={setpicture} variant="post" mode="trigger" />

          <EmojiToggle
            open={showEmoji}
            onToggle={() => setShowEmoji(!showEmoji)}
            onEmojiSelect={handleEmoji}
            variant="post"
            mode="button"
          />
        </div>

        <Button   onClick={()=>mutate()}>
         
          Post <i className="fa-regular fa-paper-plane ms-2"></i>
        </Button>
      </div>
    </Card>
  );
}