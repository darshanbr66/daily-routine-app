import { Badge } from "@/components/ui/badge";

function TaskStatusBadge({ status }) {
  const variants = {
    todo: "bg-slate-100 text-slate-800",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <Badge className={variants[status] || variants.todo}>
      {status}
    </Badge>
  );
}

export default TaskStatusBadge;