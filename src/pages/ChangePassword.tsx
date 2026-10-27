import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../hooks/useChangePassword";
import FormField from "../components/ui/FormField";
import PasswordRules from "../components/ui/PasswordRules";
import { changePasswordSchema, type ChangePasswordFormValues } from "../schemas/auth.schema";

export default function ChangePassword() {
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    mode: "onTouched",
    defaultValues: {
      password: "",
      newPassword: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const newPasswordValue = watch("newPassword") ?? "";

  const { mutate, isPending } = useChangePassword({
    onSuccess: () => {
      reset();
      setServerError("");
      setSuccessMsg("Password changed successfully.");
    },
  });

  function handleApi(values: ChangePasswordFormValues) {
    setServerError("");
    setSuccessMsg("");
    mutate(
      { password: values.password, newPassword: values.newPassword },
      {
        onError: (err: unknown) => {
          const message =
            (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
            "Failed to update password";
          setServerError(message);
        },
      },
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <title>Change Password</title>

      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <i className="fa-solid fa-key"></i>
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Change Password</h1>
            <p className="text-gray-500 dark:text-gray-400">Keep your account secure by using a strong password.</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleApi)}
          onChange={() => {
            if (serverError) setServerError("");
            if (successMsg) setSuccessMsg("");
          }}
          className="flex flex-col gap-5"
        >
          <FormField
            {...register("password")}
            variant="native"
            label="Current password"
            aria-label="Current password"
            autoComplete="current-password"
            type="password"
            showPasswordToggle
            placeholder="Enter current password"
            error={errors.password?.message}
          />

          <div>
            <FormField
              {...register("newPassword")}
              variant="native"
              label="New password"
              aria-label="New password"
              autoComplete="new-password"
              type="password"
              showPasswordToggle
              placeholder="Enter new password"
              error={errors.newPassword?.message}
              helperText="At least 8 characters with uppercase, lowercase, number, and special character."
            />
            <PasswordRules value={newPasswordValue} />
          </div>

          <FormField
            {...register("rePassword")}
            variant="native"
            label="Confirm new password"
            aria-label="Confirm new password"
            autoComplete="new-password"
            type="password"
            showPasswordToggle
            placeholder="Re-enter new password"
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

          {successMsg && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
              {successMsg}
            </div>
          )}

          <button
            disabled={isPending}
            type="submit"
            className="w-full rounded-2xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isPending ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
