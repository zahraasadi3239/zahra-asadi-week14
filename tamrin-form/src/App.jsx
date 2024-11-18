import React, { useEffect, useState } from 'react';
import styles from "./Contacts.module.css"
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";


function App() {
  const storedItem = JSON.parse(localStorage.getItem('tasks'))||[];
  const [tasks, setTasks] = useState(storedItem);
  const [taskName, setTaskName] = useState('');
  const [tasklastName, setTasklastName] = useState('');
  const [taskEmail, setTaskEmail] = useState('');
  const [taskPhone, setTaskPhone] = useState('');
  const [alert,setAlert]=useState("");
  const [searchItem, setSearchItem] = useState('')
const [editTaskId, setEditTaskId] = useState(null);
console.log(tasks);

useEffect(() => {
  
    localStorage.setItem("tasks", JSON.stringify(tasks));
   const storedItem=JSON.parse(localStorage.getItem("tasks"))||[];
}, [tasks]);


 
// setTasks(JSON.parse(localStorage.getItem('tasks'))||[]);

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks(filteredItems);
  }
  
 
 
  

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setTaskName(value);
        break;
        case 'lastName':
        setTasklastName(value);
        break;
      case 'email':
        setTaskEmail(value);
        break;
      case 'phone':
        setTaskPhone(value);
        break;
     
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName.trim() !== '' 
    && tasklastName.trim() !==''&&
    taskEmail.trim() !== '' &&
     taskPhone.trim() !== '' 
     ) {
        setAlert("Please enter valid data!")
      if (editTaskId !== null) {
        const updatedTasks = tasks.map(task => {
          if (task.id === editTaskId) {
            return {
              ...task,
              name: taskName,
              lastName:tasklastName,
              email: taskEmail,
              phone: taskPhone,
          
            };
          
          }
          setAlert("")
          return task;
        });
        setTasks(updatedTasks);
       
       
        setEditTaskId(null);
      } else {
        const newTask = {
          id: Date.now(),
          name: taskName,
          lastName:tasklastName,
          email: taskEmail,
          phone: taskPhone,
         
        };
        // saveToLocalStorage();
        setTasks([...tasks, newTask]);
      
      }
      setTaskName('');
      setTasklastName('');
      setTaskEmail('');
      setTaskPhone('');
    }
  };
console.log(tasks)

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTasklastName(taskToEdit.lastName)
      setTaskEmail(taskToEdit.email);
      setTaskPhone(taskToEdit.phone);
     
      setEditTaskId(id);
      // saveToLocalStorage();
     
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editTaskId === id) {
      setEditTaskId(null);
      
    }
    // saveToLocalStorage();
  

  };
  const deleteAllHandler=()=>{
    setTasks([])
    // saveToLocalStorage();
    setAlert("All tasks  cleared  successfully")
  }

  return (
    <div className={styles.container}>
      <h1>Contact App</h1>

      <div  className={styles.search}>
      <input
     
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
       </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="text" 
          name="name"
          placeholder="Name" 
          value={taskName} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="lastName"
          placeholder="lastName" 
          value={tasklastName} 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={taskEmail} 
          onChange={handleChange} 
        />
        <input 
          type="tel" 
          name="phone"
          placeholder="Phone" 
          value={taskPhone} 
          onChange={handleChange} 
        />
        
        <button type="submit">{editTaskId !== null ? 'Update Task' : 'Add Task'}</button>
        <button  onClick={deleteAllHandler}>Clear All</button>
      </form>
<div  className={styles.container2}>
{tasks.length ? (<ul  className={styles.contacts}>
        {tasks.map(task => (
          <li key={task.id} className={styles.item}>
          <p>{task.name} {task.lastName}</p>
          <p> <span><TfiEmail /></span>{task.email}</p>
          <p><span><FaPhoneVolume /></span>{task.phone}</p>
          <button onClick={()=>handleEdit(task.id)} ><FaUserEdit/></button>
          <button onClick={()=>handleDelete(task.id)}><BsFillTrash3Fill /></button>

          </li>
        ))}
      </ul>):(<p className={styles.message}> No Contact Yet!</p>)}

</div>
      
      
    </div>
  );
}

export default App