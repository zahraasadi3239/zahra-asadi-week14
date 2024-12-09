import React, { useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { UserContext } from "../context/UserContext";

import styles from "./SearchBox.module.css" 

function SearchBox() {
  const {search, setSearch} = useContext(UserContext);
  return (
    <div className={styles.search}>
      <input 
      
        type="text"
        placeholder="search"
        value={search}
        onChange={(e)=>setSearch(e.target.value.toLowerCase())}
      />
      {/* <button onClick={searchHandler}>
        <IoSearch />
      </button> */}


    



    </div>
  );
}

export default SearchBox;
