import  { createContext, useEffect, useState } from 'react'
import type { User1 } from '../types/posts'
import { getProfile } from '../api/auth.api'
export const AuthContext =createContext<any>(null)

export default function AuthContextProvider({children}:any) {
    const [userData,setUserData]= useState<User1|null>(null)
    const [isLoading, setIsLoading] = useState(!!localStorage.getItem('usertoken'))
    // The token is attached by the api client interceptor.
    async function getprofile() {
      try{ const {data} = await getProfile()
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
    getprofile()
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
