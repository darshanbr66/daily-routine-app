import { Pin } from "lucide-react";

function NoteCard({
  note,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(note)}
      className="flex min-h-[220px] flex-col rounded-xl border p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
      style={{
        backgroundColor:
          note.color || "#FFFFFF",
      }}
    >
      {/* Header */}

      <div className="mb-3 flex items-start justify-between">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
          {note.title}
        </h3>

        {note.isPinned && (
          <Pin
            className="h-4 w-4 shrink-0 fill-current text-amber-500"
          />
        )}
      </div>

      {/* Content */}

      <p className="line-clamp-6 flex-1 whitespace-pre-wrap text-sm text-slate-700">
        {note.content || "No content"}
      </p>

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <span className="rounded-full bg-white/70 px-2 py-1 text-xs font-medium capitalize">
          {note.category}
        </span>

        <span className="text-xs text-slate-500">
          {new Date(
            note.updatedAt
          ).toLocaleDateString()}
        </span>
      </div>
    </button>
  );
}

export default NoteCard;