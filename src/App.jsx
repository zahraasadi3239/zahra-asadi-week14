import React from "react";
import Contacts from "./components/Contacts";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <>
      
    <UserProvider>
      <Contacts />
    </UserProvider>
    
    </>
  
  );
}

export default App;
