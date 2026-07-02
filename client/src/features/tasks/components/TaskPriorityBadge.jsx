import { Badge } from "@/components/ui/badge";

function TaskPriorityBadge({ priority }) {
  const variants = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <Badge className={variants[priority] || variants.low}>
      {priority}
    </Badge>
  );
}

export default TaskPriorityBadge;