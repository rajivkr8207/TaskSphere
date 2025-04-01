import React from "react";
interface Inputprops {
  id?: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputCus: React.FC<Inputprops> = (props) => {
  return (
    <>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        autoComplete="off"
        required
        className="text-ls px-2 py-2 border outline font-semibold w-full"
      /> 
    </>
  );
};

export default InputCus;
