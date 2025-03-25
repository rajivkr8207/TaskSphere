import React from 'react'
interface Mybuttonprops  {
    id? : number;
    name?: string;
    onclick?: ()=> void;
}
const ButtonCs:React.FC<Mybuttonprops>= (props) => {
  return (
    <>
     <button id={props.id?.toString()} onClick={props.onclick} className='px-4 py-2 cursor-pointer text-white bg-gray-950 hover:bg-black font-semibold  capitalize rounded-lg'>
        {props.name? props.name: null}</button> 
    </>
  )
}

export default ButtonCs
