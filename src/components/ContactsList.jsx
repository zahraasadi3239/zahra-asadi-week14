import React, { useContext } from "react";
import styles from "./ContactsList.module.css";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";

import { UserContext } from "../context/UserContext";
function ContactsList() {
  const { tasks, handleEdit, handleDelete, search, setSearch } =
    useContext(UserContext);
  return (
    <>
      <div className={styles.container}>
        <h3>Contacts List</h3>
        {tasks.length ? (
          <ul className={styles.contacts}>
            {tasks
              .filter((task) => {
                return search.toLowerCase() === ""
                  ? task
                  : task.name.toLowerCase().includes(search);
              })

              .map((task) => (
                <li key={task.id} className={styles.item}>
                  <p>
                    {task.name} {task.lastName}
                  </p>
                  <p>
                    {" "}
                    <span>
                      <TfiEmail />
                    </span>
                    {task.email}
                  </p>
                  <p>
                    <span>
                      <FaPhoneVolume />
                    </span>
                    {task.phone}
                  </p>
                  <button onClick={() => handleEdit(task.id)}>
                    <FaUserEdit />
                  </button>
                  <button onClick={() => handleDelete(task.id)}>
                    <BsFillTrash3Fill />
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          <p className={styles.message}> No Contact Yet!</p>
        )}
      </div>
    </>
  );
}

export default ContactsList;
