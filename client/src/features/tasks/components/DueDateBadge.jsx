function DueDateBadge({ dueDate }) {
  if (!dueDate) {
    return <span>-</span>;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffInDays = Math.floor(
    (due - today) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 0) {
    return (
      <span className="font-medium text-red-600">
        🔴 Overdue
      </span>
    );
  }

  if (diffInDays === 0) {
    return (
      <span className="font-medium text-orange-600">
        🟠 Today
      </span>
    );
  }

  if (diffInDays === 1) {
    return (
      <span className="font-medium text-yellow-600">
        🟡 Tomorrow
      </span>
    );
  }

  return (
    <span className="font-medium text-green-600">
      🟢 {due.toLocaleDateString()}
    </span>
  );
}

export default DueDateBadge;