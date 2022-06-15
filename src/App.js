import './App.css';
import {Routes,Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import AddProject from './Components/AddProject';
import AddTask from './Components/AddTask';
import GanttChart from './Components/GanttChart';
import EditTask from './Components/EditTask'
import EditProject from './Components/EditProject'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path='/addproject' element={<AddProject />} ></Route>
        <Route path='/editproject' element={<EditProject />} ></Route>
        <Route path="/addtask/:id" element={<AddTask />}></Route>
        <Route path='/ganttchart/:id' element={<GanttChart/>}></Route>
        <Route path="/edittask/:id" element={<EditTask/>}></Route>
    </Routes>
   
    </>
  );
}

export default App;
