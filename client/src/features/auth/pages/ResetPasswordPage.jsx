import AuthLayout from "../components/AuthLayout";
import ResetPasswordForm from "../components/ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <AuthLayout
      description="Create a new secure password to regain access to your Daily Routine account."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}

export default ResetPasswordPage;