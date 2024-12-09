import { createContext, useEffect, useState } from "react";
import { CiLineHeight } from "react-icons/ci";

export const UserContext = createContext();

function UserProvider({ children }) {
  const storedItem = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedItem);
  const [taskName, setTaskName] = useState("");
  const [tasklastName, setTasklastName] = useState("");
  const [taskEmail, setTaskEmail] = useState("");
  const [taskPhone, setTaskPhone] = useState("");
  const [alert, setAlert] = useState("");
  const [search, setSearch] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const storedItem = JSON.parse(localStorage.getItem("tasks")) || [];
  }, [tasks]);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setTaskName(value);
        break;
      case "lastName":
        setTasklastName(value);
        break;
      case "email":
        setTaskEmail(value);
        break;
      case "phone":
        setTaskPhone(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskName || !tasklastName || !taskEmail || !taskPhone) {
      setAlert("Please enter valid data!");
      return;
    }
    setAlert(" ");

    if (editTaskId !== null) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editTaskId) {
          return {
            ...task,
            name: taskName,
            lastName: tasklastName,
            email: taskEmail,
            phone: taskPhone,
          };
        }
        setAlert("");
        return task;
      });
      setTasks(updatedTasks);

      setEditTaskId(null);
    } else {
      const newTask = {
        id: Date.now(),
        name: taskName,
        lastName: tasklastName,
        email: taskEmail,
        phone: taskPhone,
      };
      // saveToLocalStorage();
      setTasks([...tasks, newTask]);
    }
    setTaskName("");
    setTasklastName("");
    setTaskEmail("");
    setTaskPhone("");
  };
  
  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTasklastName(taskToEdit.lastName);
      setTaskEmail(taskToEdit.email);
      setTaskPhone(taskToEdit.phone);

      setEditTaskId(id);
      // saveToLocalStorage();
    }
  };

  const handleDelete = (id) => {
  
    setTasks(tasks.filter((task) => task.id !== id));
    if (editTaskId === id) {
      setAlert("Are you sure to delete this contact?")
      setEditTaskId(null);
      // setAlert("")
    }
   
    // saveToLocalStorage();
  };
  const deleteAllHandler = () => {
    setTasks([]);
    // saveToLocalStorage();
    setAlert("All tasks  cleared  successfully");
  };
  return (
    <UserContext.Provider
      value={{
        tasks,
        taskEmail,
        taskName,
        taskPhone,
        tasklastName,
        editTaskId,
        alert,
        search,
        setTasks,
        setTaskName,
        setTaskPhone,
        setTasklastName,
        setTaskEmail,

        setEditTaskId,

       setSearch,
        setAlert,
        deleteAllHandler,
        handleDelete,
        handleSubmit,
        handleEdit,
        
        handleChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
