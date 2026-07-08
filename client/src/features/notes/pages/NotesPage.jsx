import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDebounce } from "@/hooks/useDebounce";

import NotesToolbar from "../components/NotesToolbar";
import NotesGrid from "../components/NotesGrid";
import NoteDialog from "../components/NoteDialog";
import DeleteNoteDialog from "../components/DeleteNoteDialog";
import NotesSkeleton from "../components/NotesSkeleton";

import { useNotes } from "../hooks/useNotes";
import { useCreateNote } from "../hooks/useCreateNote";
import { useUpdateNote } from "../hooks/useUpdateNote";

function NotesPage() {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [editingNote, setEditingNote] =
    useState(null);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const search =
    searchParams.get("search") || "";

  const debouncedSearch =
    useDebounce(search, 300);

  const category =
    searchParams.get("category") || "";

  const pinnedFilter =
    searchParams.get("isPinned") || "";

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
  } = useNotes({
    search: debouncedSearch,
    category,
    isPinned: pinnedFilter,
  });

  const createNoteMutation =
    useCreateNote();

  const updateNoteMutation =
    useUpdateNote();

  const notes = data?.data ?? [];

  const resetState = () => {
    setDialogOpen(false);
    setDeleteDialogOpen(false);
    setEditingNote(null);
  };

  const handleCreate = () => {
    setEditingNote(null);
    setDialogOpen(true);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setDialogOpen(true);
  };

  const handleSubmit = (formData) => {
    if (editingNote) {
      updateNoteMutation.mutate(
        {
          id: editingNote._id,
          data: formData,
        },
        {
          onSuccess: resetState,
        }
      );

      return;
    }

    createNoteMutation.mutate(formData, {
      onSuccess: resetState,
    });
  };

  if (isLoading) {
    return <NotesSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load notes.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">
            Notes
          </h1>

          <p className="mt-2 text-slate-500">
            Organize your ideas and
            important notes.
          </p>
        </div>

        <NotesToolbar
          search={search}
          onSearchChange={(value) =>
            updateFilters({
              search: value,
            })
          }

          category={category}
          onCategoryChange={(value) =>
            updateFilters({
              category: value,
            })
          }

          pinnedFilter={pinnedFilter}
          onPinnedFilterChange={(
            value
          ) =>
            updateFilters({
              isPinned: value,
            })
          }

          onCreateNote={handleCreate}
          onClearFilters={clearFilters}
        />

        <NotesGrid
          notes={notes}
          onNoteClick={handleEdit}
        />
      </div>

      <NoteDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setEditingNote(null);
          }
        }}
        initialData={editingNote}
        onSubmit={handleSubmit}
        onDelete={() => {
          setDialogOpen(false);
          setDeleteDialogOpen(true);
        }}
        isLoading={
          createNoteMutation.isPending ||
          updateNoteMutation.isPending
        }
      />

      <DeleteNoteDialog
        open={deleteDialogOpen}
        onOpenChange={
          setDeleteDialogOpen
        }
        note={editingNote}
        onDeleted={resetState}
      />
    </>
  );
}

export default NotesPage;