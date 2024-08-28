import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Dropdown = ({ data }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { button, options } = data;

  const toggleDataDropdown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <div className="relative w-full mb-4">
      <div onClick={(e) => toggleDataDropdown(e)}>{button}</div>

      {isUserDropdownOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-white rounded shadow-lg py-2 z-10">
          <ul className="text-primary-900">
            {options.map((option) => {
              const id = uuidv4();
              return (
                <li
                  key={id}
                  className="h-8 flex justify-between items-center cursor-pointer hover:bg-primary-30 rounded  p-2 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
