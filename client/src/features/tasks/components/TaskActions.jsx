import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";

import DeleteTaskDialog from "./DeleteTaskDialog";

function TaskActions({ task, onEdit }) {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(task)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpenDelete(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <DeleteTaskDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        taskId={task._id}
      />
    </>
  );
}

export default TaskActions;