interface InputProps {
  label?: string;
  placeholder: string;
  type: string;
  style?: string;
  val: string;
  setVal: (value: string) => void;
}

const Input = ({
  label,
  placeholder,
  type,
  style,
  val,
  setVal,
}: InputProps) => {
  return (
    <div className="flex flex-col items-start flex-1">
      {label && <div className="text-md">{label}</div>}
      <input
        type={type}
        placeholder={placeholder}
        className={`bg-themeBackground text-themeText px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-none focus:ring-primary text-base w-full ${style}`}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
};

export default Input;
