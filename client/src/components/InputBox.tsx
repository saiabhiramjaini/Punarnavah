interface InputBoxParams{
  label: string,
  type: string,
  placeholder: string,
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({label, type, placeholder, name, onChange}: InputBoxParams)=>{
  return <div>
      <div className="text-sm font-medium text-left py-2">
          {label}
      </div>
      <input type={type} placeholder={placeholder} onChange={onChange} name={name} className="w-full px-3 py-2 border-2 rounded-xl"/>
  </div>
}