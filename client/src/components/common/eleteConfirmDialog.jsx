import {
  FaExclamationTriangle,
  FaTrash,
} from "react-icons/fa";

import LoadingButton from "./LoadingButton";

function DeleteConfirmDialog({
  open,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName = "",
  loading = false,
  onClose,
  onConfirm,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}

        <div className="flex flex-col items-center border-b p-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <FaExclamationTriangle className="text-3xl text-red-600" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            {title}
          </h2>
        </div>

        {/* Body */}

        <div className="space-y-3 p-6 text-center">
          <p className="text-slate-600">
            {message}
          </p>

          {itemName && (
            <div className="rounded-xl bg-slate-100 p-3 font-medium text-slate-800">
              {itemName}
            </div>
          )}
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">
          <LoadingButton
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </LoadingButton>

          <LoadingButton
            variant="danger"
            loading={loading}
            onClick={onConfirm}
          >
            <FaTrash />

            Delete
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmDialog;