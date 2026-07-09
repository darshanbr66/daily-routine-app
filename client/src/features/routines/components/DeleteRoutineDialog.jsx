import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteRoutine } from "../hooks/useDeleteRoutine";

function DeleteRoutineDialog({
  open,
  onOpenChange,
  routine,
  onDeleted,
}) {
  const deleteRoutineMutation =
    useDeleteRoutine();

  const handleDelete = () => {
    if (!routine) return;

    deleteRoutineMutation.mutate(
      routine._id,
      {
        onSuccess: () => {
          onOpenChange(false);
          onDeleted?.();
        },
      }
    );
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Routine?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to
            delete{" "}
            <strong>
              {routine?.name}
            </strong>
            ?

            <br />
            <br />

            This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={
              deleteRoutineMutation.isPending
            }
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteRoutineMutation.isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteRoutineDialog;