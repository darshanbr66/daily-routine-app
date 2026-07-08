import EmptyState from "@/components/common/EmptyState";

import NoteCard from "./NoteCard";

function NotesGrid({
  notes = [],
  onNoteClick,
}) {
  if (!notes.length) {
    return (
      <EmptyState
        title="No Notes Found"
        description="Create your first note to get started."
      />
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onClick={onNoteClick}
        />
      ))}
    </div>
  );
}

export default NotesGrid;