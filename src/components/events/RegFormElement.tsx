import React from "react";

const RegFormElement = ({
  name,
  value,
  type,
  id,
  onChange,
  width,
  disabled,
}: {
  name: string;
  value: string;
  type: string;
  id: string;
  width?: string;
  disabled?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}) => {
  return (
    <div className="flex flex-col flex-wrap  items-start justify-start gap-1 w-full">
      <label htmlFor={id} id="glow" className="text-base font-sans tracking-widest font-semibold md:text-lg">
        {name} :
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        name={id}
        disabled={disabled}
        id={id}
        className={`w-[100%] rounded-xl py-2 border-2 focus:ring-pink-500 border-[#B51C69] bg-transparent px-2  font-sans text-[white] max-md:w-full `}
      />
    </div>
  );
};
export default RegFormElement;
