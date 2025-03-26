import React from 'react'
interface Props {
    name: string;
}
const TopHeading:React.FC<Props> = (props) => {
  return (
    <>
      <h1 className="text-center lg:text-5xl text-4xl capitalize text_style font-semibold mt-4">
                {props.name}
              </h1>
    </>
  )
}

export default TopHeading
