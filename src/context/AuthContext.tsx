import  { createContext, useEffect, useState } from 'react'
import type { User1 } from '../types/posts'
import axios from 'axios'
export const AuthContext =createContext<any>(null)

export default function AuthContextProvider({children}:any) {
    const [userData,setUserData]= useState<User1|null>(null)
    const [isLoading, setIsLoading] = useState(!!localStorage.getItem('usertoken'))
    async function getprofile(token: string|null) {
      try{ const {data} = await axios.get('https://route-posts.routemisr.com/users/profile-data',{
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        })
        setUserData(data.data.user)
        
  }catch(err){
    localStorage.removeItem('usertoken')
    setUserData(null)
    console.error(err)
} finally {
  setIsLoading(false)
}
} 
useEffect(()=>{
  const token = localStorage.getItem('usertoken')
  if(token){
    getprofile(token)
  } else {
    setIsLoading(false)
  }
},[])
  return (
<AuthContext.Provider value={{userData,setUserData,isLoading}}>
{children}
</AuthContext.Provider>
  )
}
