import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDebounce } from "@/hooks/useDebounce";

import RoutinesToolbar from "../components/RoutinesToolbar";
import RoutinesGrid from "../components/RoutinesGrid";
import RoutineDialog from "../components/RoutineDialog";
import DeleteRoutineDialog from "../components/DeleteRoutineDialog";
import RoutineSkeleton from "../components/RoutineSkeleton";

import { useRoutines } from "../hooks/useRoutines";
import { useCreateRoutine } from "../hooks/useCreateRoutine";
import { useUpdateRoutine } from "../hooks/useUpdateRoutine";

function RoutinesPage() {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [editingRoutine, setEditingRoutine] =
    useState(null);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const search =
    searchParams.get("search") || "";

  const debouncedSearch =
    useDebounce(search, 300);

  const timeOfDay =
    searchParams.get("timeOfDay") || "";

  const isActive =
    searchParams.get("isActive") || "";

  const updateFilters = (updates) => {
    const params =
      new URLSearchParams(searchParams);

    Object.entries(updates).forEach(
      ([key, value]) => {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
    );

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const {
    data,
    isLoading,
    isError,
  } = useRoutines({
    search: debouncedSearch,
    timeOfDay,
    isActive,
  });

  const createRoutineMutation =
    useCreateRoutine();

  const updateRoutineMutation =
    useUpdateRoutine();

  const routines = data?.data ?? [];

  const resetState = () => {
    setDialogOpen(false);
    setDeleteDialogOpen(false);
    setEditingRoutine(null);
  };

  const handleCreate = () => {
    setEditingRoutine(null);
    setDialogOpen(true);
  };

  const handleEdit = (routine) => {
    setEditingRoutine(routine);
    setDialogOpen(true);
  };

  const handleSubmit = (formData) => {
    if (editingRoutine) {
      updateRoutineMutation.mutate(
        {
          id: editingRoutine._id,
          data: formData,
        },
        {
          onSuccess: resetState,
        }
      );

      return;
    }

    createRoutineMutation.mutate(
      formData,
      {
        onSuccess: resetState,
      }
    );
  };

  if (isLoading && !data) {
    return <RoutineSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load routines.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">
            Routines
          </h1>

          <p className="mt-2 text-slate-500">
            Organize and manage your
            daily routines.
          </p>
        </div>

        <RoutinesToolbar
          search={search}
          onSearchChange={(value) =>
            updateFilters({
              search: value,
            })
          }

          timeOfDay={timeOfDay}
          onTimeOfDayChange={(value) =>
            updateFilters({
              timeOfDay: value,
            })
          }

          isActive={isActive}
          onIsActiveChange={(value) =>
            updateFilters({
              isActive: value,
            })
          }

          onCreateRoutine={
            handleCreate
          }

          onClearFilters={
            clearFilters
          }
        />

        <RoutinesGrid
          routines={routines}
          onRoutineClick={
            handleEdit
          }
        />
      </div>

      <RoutineDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setEditingRoutine(null);
          }
        }}
        initialData={editingRoutine}
        onSubmit={handleSubmit}
        onDelete={() => {
          setDialogOpen(false);
          setDeleteDialogOpen(true);
        }}
        isLoading={
          createRoutineMutation.isPending ||
          updateRoutineMutation.isPending
        }
      />

      <DeleteRoutineDialog
        open={deleteDialogOpen}
        onOpenChange={
          setDeleteDialogOpen
        }
        routine={editingRoutine}
        onDeleted={resetState}
      />
    </>
  );
}

export default RoutinesPage;