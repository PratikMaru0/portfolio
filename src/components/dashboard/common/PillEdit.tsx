import ActionButton from "../../common/ActionButton";
interface PillEditProps {
  idx: number;
  link: string;
  iconUrl?: string;
  mediaUrl?: string;
  loading?: boolean;
  ariaLabel?: string;
  onEdit?: (idx: number) => void;
  onDelete?: (idx: number) => void;
}

const PillEdit = ({
  idx,
  link,
  mediaUrl,
  loading = false,
  ariaLabel = "Remove item",
  onEdit,
  onDelete,
}: PillEditProps) => {
  const isVideo = mediaUrl?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <li className="flex items-center bg-primary/10 border border-primary/70 px-3 py-1 rounded shadow text-xs gap-2 max-w-[200px]">
      <span className="truncate max-w-[80px]">{link}</span>
      {mediaUrl &&
        (isVideo ? (
          <video
            src={mediaUrl}
            className="w-6 h-6 rounded object-cover border"
            controls
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Preview"
            className="w-6 h-6 rounded object-cover border"
          />
        ))}
      {onEdit && (
        <ActionButton
          text="✏️"
          onClick={() => onEdit(idx)}
          disabled={loading}
          style="border-none px-0 py-0"
        />
      )}
      {onDelete && (
        <ActionButton
          text="❌"
          onClick={() => onDelete(idx)}
          disabled={loading}
          aria-label={ariaLabel}
          style="border-none px-0 py-0"
        />
      )}
    </li>
  );
};

export default PillEdit;
