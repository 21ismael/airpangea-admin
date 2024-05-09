
import { Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Panel from "./components/Panel/Panel";
import Flights from './components/Panel/Flights/Flights'; 
//import Login from "./components/Login";

export const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<Panel />} />
    <Route path="/admin-panel" element={<Panel />}>
      <Route path="/admin-panel/flights" element={<Flights />} />
    </Route>
  </Route>
));