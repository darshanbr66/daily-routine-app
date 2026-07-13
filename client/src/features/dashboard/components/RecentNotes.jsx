import {
  FaArrowRight,
  FaClock,
  FaStickyNote,
  FaThumbtack,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function RecentNotes({ notes }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaStickyNote className="text-yellow-500" />

          <h2 className="text-lg font-semibold text-slate-900">
            Recent Notes
          </h2>
        </div>

        <Link
          to="/dashboard/notes"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Content */}

      {notes.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center text-slate-500">
          No notes available.
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="rounded-xl border p-4 transition hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold text-slate-900">
                      {note.title}
                    </h3>

                    {note.isPinned && (
                      <FaThumbtack
                        className="text-amber-500"
                        size={12}
                      />
                    )}
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {note.preview}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className="rounded-full px-2 py-1 text-xs font-medium capitalize"
                      style={{
                        backgroundColor: note.color,
                      }}
                    >
                      {note.category}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <FaClock />

                      {new Date(
                        note.updatedAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}

      <Link
        to="/dashboard/notes"
        className="mt-5 flex items-center justify-end gap-2 text-sm font-semibold text-indigo-600 hover:underline"
      >
        Open Notes

        <FaArrowRight />
      </Link>
    </div>
  );
}

export default RecentNotes;