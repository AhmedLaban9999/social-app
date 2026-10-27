import { Button, Datepicker, Select } from "flowbite-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useState } from "react";
import { useAuthActions } from "../hooks/useAuthActions";
import FormField from "../components/ui/FormField";
import PasswordRules from "../components/ui/PasswordRules";
import AuthFormLayout from "../components/auth/AuthFormLayout";
import { registerSchema, type RegisterFormValues } from "../schemas/auth.schema";

export default function Register() {
  const { signup } = useAuthActions();
  const nav = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      username: "",
      gender: "male",
      email: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password") ?? "";

  async function handleApi(values: RegisterFormValues) {
    setServerError("");
    setIsSubmitting(true);
    await signup(values)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "success!",
          text: res.data.message,
          confirmButtonText: "cool",
        });
        setTimeout(() => {
          nav("/Login");
        }, 2000);
      })
      .catch((err) => {
        setServerError(err.response?.data?.message || "Registration failed. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <AuthFormLayout activeTab="register">
      <form
        onSubmit={handleSubmit(handleApi)}
        onChange={() => {
          if (serverError) setServerError("");
        }}
        className="flex flex-col gap-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            {...register("name")}
            placeholder="Full name"
            aria-label="Full name"
            autoComplete="name"
            icon={() => <i className="fa-regular fa-user text-gray-400"></i>}
            error={errors.name?.message}
          />
          <FormField
            {...register("username")}
            placeholder="Username"
            aria-label="Username"
            autoComplete="username"
            icon={() => <i className="fa-solid fa-at text-gray-400"></i>}
            error={errors.username?.message}
          />
        </div>

        <FormField
          {...register("email")}
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          icon={() => <i className="fa-regular fa-envelope text-gray-400"></i>}
          error={errors.email?.message}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField error={errors.dateOfBirth?.message}>
            <Datepicker
              onChange={(date) => {
                if (serverError) setServerError("");
                if (date) {
                  setValue("dateOfBirth", date, { shouldValidate: true, shouldTouch: true });
                }
              }}
              placeholder="Date of birth"
            />
          </FormField>
          <FormField error={errors.gender?.message}>
            <Select {...register("gender")} aria-label="Gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormField>
        </div>

        <div>
          <FormField
            {...register("password")}
            type="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="new-password"
            showPasswordToggle
            icon={() => <i className="fa-solid fa-key text-gray-400"></i>}
            error={errors.password?.message}
          />
          <PasswordRules value={passwordValue} />
        </div>

        <FormField
          {...register("rePassword")}
          type="password"
          placeholder="Confirm password"
          aria-label="Confirm password"
          autoComplete="new-password"
          showPasswordToggle
          icon={() => <i className="fa-solid fa-lock text-gray-400"></i>}
          error={errors.rePassword?.message}
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
          Create account
        </Button>
      </form>
    </AuthFormLayout>
  );
}
