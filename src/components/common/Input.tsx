interface InputProps {
  label?: string;
  placeholder: string;
  type: string;
  style?: string;
  val: any;
  setVal: (value: any) => void;
  required?: boolean;
  maxLength?: number;
}

const Input = ({
  label,
  placeholder,
  type,
  style,
  val,
  setVal,
  required,
  maxLength,
}: InputProps) => {
  return (
    <div className="flex flex-col items-start flex-1">
      {label && <div className="text-md my-1">{label}</div>}
      <input
        type={type}
        placeholder={`${placeholder} ${required ? "*" : ""}`}
        className={`bg-themeBackground text-themeText px-4 py-3 border-2 rounded-md focus:outline-none focus:border-primary focus:ring-primary text-base w-full ${style}`}
        value={val}
        required
        onChange={(e) => setVal(e.target.value)}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;
