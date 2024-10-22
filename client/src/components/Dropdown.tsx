import React from 'react';

interface DropdownParams {
  name: string;
  label: string;
  options: string[];
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown = ({ name, label, options, handleInputChange }: DropdownParams) => {
  return (
    <div className="text-sm font-medium text-left py-2">
      <div className=''>
      <label htmlFor={name} className="dropdown-label">
        {label}
      </label>
      </div>
      
    
      <select
        name={name}
        id={name}
        onChange={handleInputChange}
        className="dropdown-select w-full px-3 py-2 border-2 rounded-xl mt-2"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
