import DashboardSummary from "../components/DashboardSummary";
import { useSelector } from "react-redux";

function DashboardPage() {
  const { user } = useSelector((state) => state.auth);

  const currentHour = new Date().getHours();

  let greeting = "Good Evening";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          {greeting}, {user?.firstName} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your productivity today.
        </p>
      </div>

      <DashboardSummary />
    </div>
  );
}

export default DashboardPage;