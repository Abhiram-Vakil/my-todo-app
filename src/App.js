import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { AiOutlinePlus } from "react-icons/ai";
import {db} from './firebase';
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-grey-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-orange-500 text-slate-100`,
  count: `text-center p-2 `
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput]= useState('')

  //CREATE
  const createTodo=async (e) =>{
    e.preventDefault(e)
    if(input ===''){
      alert('Please enter a valid todo')
      return
    }
    await addDoc(collection(db, 'todo'),{
      text: input,
      completed: false,
    })
    setInput('')
  }

  //READ
  useEffect(()=>{
  const q = query(collection(db, 'todo'))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todosArr =[]
    querySnapshot.forEach((doc)=> {
      todosArr.push({...doc.data(), id: doc.id})
    });
    setTodos(todosArr)
    } )
    return () => unsubscribe
  },[])

  //UPDATE
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db,'todo',todo.id),{
      completed: !todo.completed
    })
  }

  //DELETE
  const deleteTodo = async (id) =>{
    e.preventDefault(e)
    await deleteDoc(doc(db,'todo',id))
  }


  
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder='Add Todo' />
          <button className={style.button}><AiOutlinePlus size={30}/></button>
        </form>
        <form >
          <ul>
            {todos.map((todo,index)=> (
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
            ))}
        
          </ul>
          
        </form>
        {todos.length<1 ? null :<p className={style.count}>{`You have ${todos.length} todos`}</p>}
        
      </div>
    </div>
  );
}

export default App;
