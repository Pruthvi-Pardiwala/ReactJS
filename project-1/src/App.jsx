import React from "react";
import './App.css'


import { Mess } from "./components/prime-components";
import PieChartComponent from "./components/recharts-components";
import { B1 } from "./components/bootstrap-components";

function App() {
  return (
    <>
      <Mess/>
      <B1/>
      <PieChartComponent/>
    </>
  );
}


export default App
