import React, { useEffect, useState } from "react";
import axios from 'axios'
function TodoList() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
 
  const handleAdd = ()=>{
    if(!todo){
      alert('todo is emty')
    }else{
      
    axios.post('https://todoslist-qihj.onrender.com/add',{todo})
    .then((response)=>{
      if(response.data.success){
        console.log(response.data)
       setTodo("")
       
      }
  
    })
    .catch((err)=>console.log(err)
    )
  }
}
  const handleDelete = (id)=>{
    axios.delete('https://todoslist-qihj.onrender.com/delete/'+id)
    .then((response)=>{
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id))
      console.log(response.data)})
    .catch((err)=>console.log(err))
  }
  const handleUpdate = (id)=>{
    axios.put('https://todoslist-qihj.onrender.com/update/'+id)
    .then((response)=>{
      console.log(response.message,response.data),
      location.reload()
    })
  .catch((err)=>console.log(err))

  }
  useEffect(()=>{
    axios.get('https://todoslist-qihj.onrender.com/get')
    .then((response) => {
      console.log(response.data);
      setTodos(response.data.data);
     
    })
    .catch((err)=>console.log(err))

  },[todo])
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        {/* <!-- Heading --> */}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">  
          My To-Do List
        </h2>

        {/* <!-- Input + Add Button --> */}
        <div className="flex gap-2 mb-4">
          <input
            value={todo}
            type="text"
            placeholder="Add a new task..."
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>setTodo(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* <!-- To-Do List Display --> */}
        {
  todos.map((todo) => {
    return (
      <ul key={todo._id} className="space-y-2 mt-1">
        <li className="flex  justify-between items-center bg-gray-100 px-4 py-2 rounded-md">
          <button onClick={() => handleUpdate(todo._id)}>
            ✔
          </button>
           <span className={todo.done ?"line-through text-gray-500":''}>{todo.todo}</span>
          <button
            onClick={() => handleDelete(todo._id)}
            className="text-red-500 hover:text-red-700"
          >
            🗑️
          </button>
        </li>
      </ul>
    );
  })
}

      </div>
    </>
  );
}

export default TodoList;
