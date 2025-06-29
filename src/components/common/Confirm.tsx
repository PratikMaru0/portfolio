import Button from "./Button";

interface ConfirmProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  note?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm = ({
  open,
  title = "Are you sure, you want to delete this user from platform ? ",
  note = "This action can not be undone.",
  message,
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-themeBackground/50">
      <div className="bg-themeBackground/80 border border-border rounded-xl shadow-lg p-6 w-full max-w-xs">
        <p className="text-md font-bold mb-2 text-themeText">{title}</p>
        <p className="mb-2 text-semibold text-sm text-primary/80">{note}</p>
        <p className="mb-6 text-themeText/80">{message}</p>
        <div className="flex justify-end gap-2">
          <Button
            style="btn btn-sm btn-outline"
            onClick={onCancel}
            type="button"
            text={cancelText}
          />
          <Button
            style="btn btn-sm btn-error text-themeText"
            onClick={onConfirm}
            type="button"
            text={confirmText}
          />
        </div>
      </div>
    </div>
  );
};

export default Confirm;
