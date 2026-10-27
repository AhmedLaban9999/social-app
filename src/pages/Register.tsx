import { Button, Datepicker, Select } from "flowbite-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2'
import { useAuthActions } from "../hooks/useAuthActions";
import FormField from "../components/ui/FormField";
import AuthFormLayout from "../components/auth/AuthFormLayout";




export default function Register() {
  const { signup } = useAuthActions()
let nav = useNavigate()
const validschema =zod.object({
    name:zod.string().min(2,'min char is 2').max(20,'max char  is 20'),
    username:zod.string().min(2,'min char is 2').max(20,'max char  is 20'),
   
   
    email:zod.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Email is not valid"),
     dateOfBirth:zod.date().refine((data:Date)=>{
        const nowDate =new Date()
        const nowYear = nowDate.getFullYear()
        const dateofbirth = data.getFullYear()
        return (nowYear-dateofbirth) >10
    },{
        error: 'Date not valid'
    }),
     gender:zod.enum(['male','female']),
    password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must contain uppercase, lowercase, number and special character, min 8 chars"),
    rePassword:zod.string()
}).refine((data)=>{
    return data.password == data.rePassword
},{
    error:'rePassword is not match',
    path:['rePassword']
})
    
type user =zod.infer<typeof validschema>

 const {handleSubmit,register,setValue,formState:{errors}} =useForm<user>(
    { defaultValues:{
        name:'',
         username:'',
    gender:'male',
    email:'',
    password:'',
   rePassword:''
    }
,resolver:zodResolver(validschema)

})

 async   function handleApi(values: user){
 let data = await signup(values).then((data)=>{

Swal.fire({
  icon: "success",
  title: "success!",
  text: data.data.message,
  confirmButtonText:'cool'

})
setTimeout(()=>{
    nav('/Login')
},2000);
}).catch((err)=>{
    Swal.fire({
  icon: "error",
  title: "Error!",
  text:err.response?.data.message,

});
})
    }
  return (
    <AuthFormLayout activeTab="register">
      <form onSubmit={handleSubmit(handleApi)} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            {...register('name')}
            placeholder="Full name"
            icon={() => <i className="fa-regular fa-user text-gray-400"></i>}
            error={errors.name?.message}
          />
          <FormField
            {...register('username')}
            placeholder="Username"
            icon={() => <i className="fa-solid fa-at text-gray-400"></i>}
            error={errors.username?.message}
          />
        </div>

        <FormField
          {...register('email')}
          type="email"
          placeholder="Email"
          icon={() => <i className="fa-regular fa-envelope text-gray-400"></i>}
          error={errors.email?.message}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField error={errors.dateOfBirth?.message}>
            <Datepicker onChange={(date) => { date && setValue('dateOfBirth', date) }} placeholder="Date of birth" />
          </FormField>
          <FormField error={errors.gender?.message}>
            <Select {...register('gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormField>
        </div>

        <FormField
          {...register('password')}
          type="password"
          placeholder="Password"
          icon={() => <i className="fa-solid fa-key text-gray-400"></i>}
          error={errors.password?.message}
        />

        <FormField
          {...register('rePassword')}
          type="password"
          placeholder="Confirm password"
          icon={() => <i className="fa-solid fa-lock text-gray-400"></i>}
          error={errors.rePassword?.message}
        />

        <Button type="submit" size="lg" className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
          Create account
        </Button>
      </form>
    </AuthFormLayout>
  )

}
