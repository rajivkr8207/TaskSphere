import React, { useEffect, useState } from "react";
import ButtonCs from "../../Components/ButtonCs";
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import TodoShow from "./TodoShow";
import InputCus from "../../Components/InputCus";
// import TodoShow from "./TodoShow";
interface todos {
  id: number;
  title: string;
  completed: boolean;
}
const TodoApp: React.FC = () => {
  const todostore: string = "typestore";
  const [alltodo, setAlltodo] = useState<todos[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [values, setValues] = useState<todos>({
    id: 0,
    title: "",
    completed: false,
  });
  const [view, setView] = useState<boolean>(false)
  const [todoshow, setTodoshow] = useState<todos| null>(null)
  function refreshtodo() {
    const storedTodos = localStorage.getItem(todostore);
    if (storedTodos) {
      setAlltodo(JSON.parse(storedTodos));
    }
  }
  useEffect(() => {
    refreshtodo();
  }, []);
  


  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      title: e.target.value,
    });
  };


  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: values.title,
      completed: false,
    };
    if (edit) {
      const updatedTodos = alltodo.map((todo: todos) => {
        if (todo.id === values.id) {
          return newTodo;
        }
        return todo;
      });
      setAlltodo(updatedTodos);
      setEdit(false);
      setValues({
        id: 0,
        title: "",
        completed: false,
      });
      localStorage.setItem(todostore, JSON.stringify(updatedTodos));
    } else {
      if (values.title.trim() !== "") {
        const store = localStorage.getItem(todostore);
        const newStore = store ? [...JSON.parse(store), newTodo] : [newTodo];
        localStorage.setItem(todostore, JSON.stringify(newStore));
        setValues({
          id: 0,
          title: "",
          completed: false,
        });
      }
      refreshtodo();
    }
  };

  const handletododelete = (id: number) => {
    const todo = alltodo.find((todo) => todo.id == id);
    if (todo) {
      const newTodo = alltodo.filter((todo) => todo.id != id);
      localStorage.setItem(todostore, JSON.stringify(newTodo));
      setAlltodo(newTodo);
    }
    refreshtodo();
  };
  const handleTodoComplete = (id: number) => {
    const newTodo = alltodo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo; // Return unchanged todo for others
    });

    localStorage.setItem(todostore, JSON.stringify(newTodo));
    refreshtodo();
  };

  const handleTodoEdit = (id: number) => {
    const todo = alltodo.find((todo) => todo.id == id);
    if (todo) {
      setValues({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      });
    }
    setEdit(true);
  };

const handletodoview = (id:number)=>{
    setView(true);
    const todo = alltodo.find((todo) => todo.id == id);
    if (todo) {
        setTodoshow(todo)
    }

}
// console.log(todoshow)


  return (
    <>
    
    {view && todoshow && <TodoShow todoshow={todoshow} setView={setView} />}

      <div className=" flex justify-center flex-col gap-5 items-center">
        <h1 className="text-center text-5xl text-black font-semibold mt-4">
          Todo App{" "}
        </h1>
        <div className="flex  gap-3">
          <InputCus type={"text"} value={values.title} onChange={handlechange} placeholder={"Add Todo..."} />
          <ButtonCs onclick={handleAddTodo} name={"addTodo"} />
        </div>
        <div className="min-h-60 lg:min-w-98 min-w-full bg-amber-200 border-2 p-3 shadow-2xl rounded-xl">
          <ul className="flex flex-col gap-3">
            {alltodo?.map((item, index) => {
              return (
                <li
                  key={index}
                  
                  className={`w-full px-1 py-2 relative border rounded-lg ${
                    item.completed && "bg-green-400"
                  }`}
                >
                  {item.completed && (
                    <span onClick={()=>handletodoview(item.id)} className="text-center text-white bg-green-700 absolute top-4 lg:left-40 left-30  px-2 rounded-2xl text-[0.8rem] ">
                      Completed
                    </span>
                  )}
                  <div className="flex justify-between items-center pl-2">
                    <h1 onClick={()=>handletodoview(item.id)} className="text-lg font-bold ">
                      {item.title.slice(0, 10)}...
                    </h1>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handletododelete(item.id)}
                        className="px-2 py-2 cursor-pointer group text-white bg-gray-950 hover:bg-black font-semibold  rounded-lg"
                      >
                        <FaTrash className="text-red-500 group-hover:text-red-600" />
                      </button>
                      <button
                        onClick={() => handleTodoEdit(item.id)}
                        className="px-2 py-2 cursor-pointer text-white bg-gray-950 group hover:bg-black font-semibold  rounded-lg"
                      >
                        <MdEditSquare className="text-green-500 group-hover:text-green-600" />
                      </button>
                      <button
                        onClick={() => handleTodoComplete(item.id)}
                        className="px-2 py-2 cursor-pointer text-white bg-gray-950 group hover:bg-black font-semibold  rounded-lg"
                      >
                        <IoCheckmarkDoneCircle className="text-yellow-500 group-hover:text-yellow-600" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
