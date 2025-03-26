import React from 'react'
interface Mybuttonprops  {
    id? : number;
    name?: string;
    onclick?: ()=> void;
}
const ButtonCs:React.FC<Mybuttonprops>= (props) => {
  return (
    <>
     <button id={props.id?.toString()} onClick={props.onclick} className='px-3  py-2 cursor-pointer 
     btn_style font-semibold  capitalize rounded-lg'>
        {props.name? props.name: null}</button> 
    </>
  )
}

export default ButtonCs
