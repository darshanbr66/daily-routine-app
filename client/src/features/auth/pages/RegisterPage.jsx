import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <AuthLayout
      description="Join thousands of users building productive habits, achieving goals, and organizing their daily routines with one beautiful application."
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;