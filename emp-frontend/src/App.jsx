import React from "react";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./components/AddEmployee";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
       <Routes>
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<AddEmployee />} />
       </Routes>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
