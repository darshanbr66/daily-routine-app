import {
  FaTasks,
  FaCheckCircle,
  FaBullseye,
  FaStickyNote,
  FaSyncAlt,
  FaChartLine,
} from "react-icons/fa";

import StatCard from "./StatCard";

function StatsGrid({ stats }) {
  const cards = [
    {
      title: "Tasks",
      value: stats.tasks.total,
      subtitle: `${stats.tasks.pending} Pending • ${stats.tasks.overdue} Overdue`,
      icon: FaTasks,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      to: "/dashboard/tasks",
    },

    {
      title: "Habits",
      value: stats.habits.total,
      subtitle: `${stats.habits.active} Active`,
      icon: FaCheckCircle,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      to: "/dashboard/habits",
    },

    {
      title: "Goals",
      value: stats.goals.total,
      subtitle: `${stats.goals.completed} Completed`,
      icon: FaBullseye,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      to: "/dashboard/goals",
    },

    {
      title: "Notes",
      value: stats.notes.total,
      subtitle: "Personal & Work",
      icon: FaStickyNote,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
      to: "/dashboard/notes",
    },

    {
      title: "Routines",
      value: stats.routines.total,
      subtitle: `${stats.routines.active} Active`,
      icon: FaSyncAlt,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      to: "/dashboard/routines",
    },

    {
      title: "Productivity",
      value: `${stats.productivity}%`,
      subtitle: "Overall Progress",
      icon: FaChartLine,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      to: "#",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          iconColor={card.iconColor}
          iconBg={card.iconBg}
          to={card.to}
        />
      ))}
    </section>
  );
}

export default StatsGrid;