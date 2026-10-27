

import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuthActions } from "../hooks/useAuthActions";
import FormField from "../components/ui/FormField";
import AuthFormLayout from "../components/auth/AuthFormLayout";



export default function Login() {
  let { setUserData } = useContext(AuthContext)
  const { signin } = useAuthActions()
let nav = useNavigate()
const validschema =zod.object({
  
   
    email:zod.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Email is not valid"),

    password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must contain uppercase, lowercase, number and special character, min 8 chars"),
   
})

type user =zod.infer<typeof validschema>

 const {handleSubmit,register,formState:{errors}} =useForm<user>(
    { defaultValues:{
    
    email:'',
    password:'',
  
    }
,resolver:zodResolver(validschema)

})

    function handleApi(values: user){
signin(values).then(({data})=>{

Swal.fire({
  icon: "success",
  title: "success!",
  text: data.message,
  confirmButtonText:'cool'

})
setUserData(data?.data?.user)
localStorage.setItem('usertoken',data.data.token)
setTimeout(()=>{
    nav('/Feed', { replace: true })
},2000);
}).catch(({response :{data}})=>{
    Swal.fire({
  icon: "error",
  title: "Error!",
  text:data.message,

}) ;
})
}

return (
  <AuthFormLayout activeTab="login">
    <form onSubmit={handleSubmit(handleApi)} className="flex flex-col gap-4">
      <FormField
        {...register('email')}
        type="email"
        placeholder="Email"
        sizing="lg"
        icon={() => <i className="fa-regular fa-user text-gray-400"></i>}
        error={errors.email?.message}
      />

      <FormField
        {...register('password')}
        type="password"
        placeholder="Password"
        sizing="lg"
        icon={() => <i className="fa-solid fa-key text-gray-400"></i>}
        error={errors.password?.message}
      />

      <Button type="submit" size="lg" className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
        Log In
      </Button>
    </form>
  </AuthFormLayout>
)
    
  }
