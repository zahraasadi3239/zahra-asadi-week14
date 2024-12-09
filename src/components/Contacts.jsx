import React, { useContext, useState } from "react";
import styles from "./Contacts.module.css";
import ContactsList from "./ContactsList";
import { UserContext } from "../context/UserContext";
import SearchBox from "./SearchBox";
function Contacts() {
  const {
    tasks,
    taskName,
    tasklastName,
    taskEmail,
    taskPhone,
    alert,
    handleChange,
    handleSubmit,
    editTaskId,
    searchItem,
    setAlert,
    filterItem,
    setFilterItem,
    deleteAllHandler,
  } = useContext(UserContext);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   switch (name) {
  //     case "name":
  //       setTaskName(value);
  //       break;
  //     case "lastName":
  //       setTasklastName(value);
  //       break;
  //     case "email":
  //       setTaskEmail(value);
  //       break;
  //     case "phone":
  //       setTaskPhone(value);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (!taskName || !tasklastName || !taskEmail || !taskPhone) {
  //     setAlert("Please enter valid data!");
  //     return;
  //   }
  //   setAlert(" ");

  //   if (editTaskId !== null) {
  //     const updatedTasks = tasks.map((task) => {
  //       if (task.id === editTaskId) {
  //         return {
  //           ...task,
  //           name: taskName,
  //           lastName: tasklastName,
  //           email: taskEmail,
  //           phone: taskPhone,
  //         };
  //       }
  //       return task;
  //     });
  //     setTasks(updatedTasks);

  //     setEditTaskId(null);
  //   } else {
  //     const newTask = {
  //       id: Date.now(),
  //       name: taskName,
  //       lastName: tasklastName,
  //       email: taskEmail,
  //       phone: taskPhone,
  //     };
  //     // saveToLocalStorage();
  //     setTasks([...tasks, newTask]);
  //   }
  //   setTaskName("");
  //   setTasklastName("");
  //   setTaskEmail("");
  //   setTaskPhone("");
  //   console.log(tasks);
  // };

  return (
    <>
      <div className={styles.container}>
      
        <h1>Contact App</h1>

        <SearchBox />
       
        <div className={styles.form}>
        
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

            <button type="submit">
              {editTaskId !== null ? "Update Task" : "Add Task"}
            </button>
            <button onClick={deleteAllHandler}>Clear All</button>
          </form>
        </div>
        <div className={styles.alert}>{alert ? <p>{alert}</p> : ""}</div>
        <ContactsList />
      </div>
    </>
  );
}

export default Contacts;
