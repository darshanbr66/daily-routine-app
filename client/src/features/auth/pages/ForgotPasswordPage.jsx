import AuthLayout from "../components/AuthLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

function ForgotPasswordPage() {
  return (
    <AuthLayout
      description="Forgot your password? Don't worry. We'll send you a secure password reset link so you can regain access to your Daily Routine account."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPasswordPage;