interface TextAreaProps {
  label?: string;
  placeholder: string;
  style?: string;
  val: string;
  rows?: number;
  setVal: (value: string) => void;
  maxLength: number;
}

const TextArea = ({
  label,
  placeholder,
  style,
  rows,
  val,
  setVal,
  maxLength,
}: TextAreaProps) => {
  return (
    <div className="flex flex-col items-start">
      <div className="text-md">{label}</div>
      <textarea
        placeholder={placeholder}
        rows={rows || 6}
        className={`text-themeText bg-themeBackground w-full px-4 py-3 border rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-primary text-base resize-none ${style}`}
        value={val}
        maxLength={maxLength}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
