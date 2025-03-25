import React from 'react';
import { IoClose } from 'react-icons/io5';
import ButtonCs from '../../Components/ButtonCs';

interface TodoShowProps {
  todoshow: {
    title: string;
    completed: boolean;
  };
  setView: (view: boolean) => void;
}

const TodoShow: React.FC<TodoShowProps> = ({ todoshow, setView }) => {
  return (
    <div className="w-full z-20 h-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col gap-4 justify-start items-center">
        <IoClose
          onClick={() => setView(false)}
          className="absolute top-4 right-4 text-3xl text-gray-700 cursor-pointer hover:text-black transition"
        />
        <h1 className="text-2xl font-semibold text-gray-800">{todoshow.title}</h1>
        {todoshow.completed ? (
          <span className="text-white bg-green-600 px-3 py-1 rounded-2xl text-sm">
            Completed
          </span>
        ) : (
          <span className="text-white bg-yellow-500 px-3 py-1 rounded-2xl text-sm">
            Pending
          </span>
        )}
        
        <ButtonCs name='close' onclick={()=>{setView(false)}} />
        
      </div>
    </div>
  );
};

export default TodoShow;
