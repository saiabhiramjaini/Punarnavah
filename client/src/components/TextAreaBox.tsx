interface TextAreaBoxParams {
  label: string;
  placeholder: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaBox = ({ label, placeholder, name, onChange }: TextAreaBoxParams) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        className="w-full h-40 p-2 border-2 rounded-xl"
      ></textarea>
    </div>
  );
}