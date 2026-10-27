import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuthActions } from "../hooks/useAuthActions";
import FormField from "../components/ui/FormField";
import AuthFormLayout from "../components/auth/AuthFormLayout";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schema";

export default function Login() {
  const { setUserData } = useContext(AuthContext);
  const { signin } = useAuthActions();
  const nav = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  function handleApi(values: LoginFormValues) {
    setServerError("");
    setIsSubmitting(true);
    signin(values)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          title: "success!",
          text: data.message,
          confirmButtonText: "cool",
        });
        setUserData(data?.data?.user);
        localStorage.setItem("usertoken", data.data.token);
        setTimeout(() => {
          nav("/Feed", { replace: true });
        }, 2000);
      })
      .catch((err) => {
        setServerError(err?.response?.data?.message || "Invalid email or password");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <AuthFormLayout activeTab="login">
      <form
        onSubmit={handleSubmit(handleApi)}
        onChange={() => {
          if (serverError) setServerError("");
        }}
        className="flex flex-col gap-4"
      >
        <FormField
          {...register("email")}
          type="email"
          placeholder="Email"
          sizing="lg"
          icon={() => <i className="fa-regular fa-user text-gray-400"></i>}
          error={errors.email?.message}
        />

        <FormField
          {...register("password")}
          type="password"
          placeholder="Password"
          sizing="lg"
          showPasswordToggle
          icon={() => <i className="fa-solid fa-key text-gray-400"></i>}
          error={errors.password?.message}
        />

        {serverError && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
          >
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Log In
        </Button>
      </form>
    </AuthFormLayout>
  );
}
