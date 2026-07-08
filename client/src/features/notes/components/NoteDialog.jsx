import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { noteSchema } from "../schemas/note.schema";

function NoteDialog({
  open,
  onOpenChange,
  initialData = null,
  onSubmit,
  onDelete,
  isLoading = false,
}) {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "personal",
      color: "#FFFFFF",
      isPinned: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title ?? "",
        content: initialData.content ?? "",
        category:
          initialData.category ?? "personal",
        color:
          initialData.color ?? "#FFFFFF",
        isPinned:
          initialData.isPinned ?? false,
      });

      return;
    }

    reset({
      title: "",
      content: "",
      category: "personal",
      color: "#FFFFFF",
      isPinned: false,
    });
  }, [initialData, reset]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit Note"
              : "Create Note"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Title */}

          <div>
            <Input
              placeholder="Title"
              {...register("title")}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}

          <div>
            <Textarea
              rows={8}
              placeholder="Write your note..."
              {...register("content")}
            />

            {errors.content && (
              <p className="mt-1 text-sm text-red-500">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Category */}

          <select
            className="h-10 w-full rounded-md border px-3"
            {...register("category")}
          >
            <option value="personal">
              Personal
            </option>

            <option value="work">
              Work
            </option>

            <option value="study">
              Study
            </option>

            <option value="ideas">
              Ideas
            </option>

            <option value="other">
              Other
            </option>
          </select>

          {/* Color */}

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">
              Color
            </label>

            <Input
              type="color"
              className="h-10 w-20 p-1"
              {...register("color")}
            />
          </div>

          {/* Pin */}

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("isPinned")}
            />

            Pin this note
          </label>

          {/* Footer */}

          <div className="flex items-center justify-between pt-2">
            <div>
              {isEditing && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  onOpenChange(false)
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
              >
                {isEditing
                  ? "Update Note"
                  : "Create Note"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;