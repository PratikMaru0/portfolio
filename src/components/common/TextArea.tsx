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
      <div className="text-md my-1">{label}</div>
      <textarea
        placeholder={placeholder}
        rows={rows || 6}
        className={`bg-themeBackground text-themeText px-4 py-3 border-2 rounded-md focus:outline-none focus:border-primary focus:ring-primary text-base w-full ${style}`}
        value={val}
        maxLength={maxLength}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
