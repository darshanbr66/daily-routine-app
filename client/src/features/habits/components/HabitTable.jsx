import { CheckSquare, Square } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";

import { useHabits } from "../hooks/useHabits";
import { useToggleHabit } from "../hooks/useToggleHabit";

import HabitActions from "./HabitActions";

function HabitTable({
  search,
  onEdit,
}) {
  const { data, isLoading } = useHabits();

  const toggleHabitMutation =
    useToggleHabit();

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading habits...
      </div>
    );
  }

  const habits = data?.data || [];

  const filteredHabits = habits.filter(
    (habit) =>
      habit.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      habit.description
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (filteredHabits.length === 0) {
    return (
      <EmptyState
        title="No Habits Found"
        description="Create your first habit to start building consistency."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Done
            </th>

            <th className="px-6 py-4 text-left">
              Habit
            </th>

            <th className="px-6 py-4 text-left">
              Category
            </th>

            <th className="px-6 py-4 text-left">
              Current Streak
            </th>

            <th className="px-6 py-4 text-left">
              Best Streak
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredHabits.map((habit) => {
            const today = new Date();

            today.setHours(0, 0, 0, 0);

            const completedToday =
              habit.completedDates?.some(
                (date) => {
                  const completed =
                    new Date(date);

                  completed.setHours(
                    0,
                    0,
                    0,
                    0
                  );

                  return (
                    completed.getTime() ===
                    today.getTime()
                  );
                }
              );

            return (
              <tr
                key={habit._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      toggleHabitMutation.mutate(
                        habit._id
                      )
                    }
                    className="text-green-600 hover:text-green-700"
                  >
                    {completedToday ? (
                      <CheckSquare
                        size={22}
                      />
                    ) : (
                      <Square
                        size={22}
                      />
                    )}
                  </button>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {habit.icon}
                    </span>

                    <span className="font-medium">
                      {habit.title}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {habit.category}
                </td>

                <td className="px-6 py-4">
                  🔥 {habit.currentStreak}
                </td>

                <td className="px-6 py-4">
                  🏆 {habit.bestStreak}
                </td>

                <td className="px-6 py-4">
                  <HabitActions
                    habit={habit}
                    onEdit={onEdit}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default HabitTable;