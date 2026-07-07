import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <AuthLayout
      description="Plan your day, build better habits, achieve your goals, and stay productive with one beautiful application."
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;