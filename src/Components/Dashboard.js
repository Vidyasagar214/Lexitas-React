import React, { useState,useEffect } from 'react';
import {BiSearch} from 'react-icons/bi'
import {FaChartBar,FaPencilAlt,FaTrashAlt,FaPlus} from 'react-icons/fa';
import {MdLibraryAdd} from 'react-icons/md'
import {NavLink} from 'react-router-dom'
import {Button,OverlayTrigger,Tooltip,Modal} from 'react-bootstrap'
import Header from './Header'
import {DateFormate} from './DateFormate'
import axios from 'axios';
import { icons } from 'react-icons/lib';

function Dashboard() {
   const [projectData,setProjectData]=useState([]);

  //to display the data---
   useEffect(()=>{
     axios.get('https://6295db8d810c00c1cb69856e.mockapi.io/Projects')
     .then((response)=>{
       setProjectData(response.data)
       console.log(response.data)
     })
   },[]);

    // for editing the data----
    const setData = (data) => {
    let {p_id,projectname,startdate,enddate,status,division,projectmanager,projectmembers,description} = data;
    localStorage.setItem('ID', p_id);
    localStorage.setItem('Project Name', projectname);
    localStorage.setItem('Start Date', startdate);
    localStorage.setItem('End Date', enddate);
    localStorage.setItem('Status', status);
    localStorage.setItem('Division', division);
    localStorage.setItem('Project Manager', projectmanager);
    localStorage.setItem('Project Members', projectmembers.toString());
    localStorage.setItem('Description', description);
}

//  for deleting data-----
const onDelete = (p_id) => {
  axios.delete(`https://6295db8d810c00c1cb69856e.mockapi.io/Projects/${p_id}`)
  .then(() => {
    getData();
})

}

  // to load the data after delete---
  const getData = () => {
    axios.get(`https://6295db8d810c00c1cb69856e.mockapi.io/Projects`)
        .then((getData) => {
             setProjectData(getData.data);
         })}

// for delete popup---------
const [infoId,setInfoId]=useState("");
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = (info) => {
   setShow(true);
   setInfoId(info);
   console.log(info);
}


// Search Filter---------
const [filteredResults, setFilteredResults] = useState([]);
const [searchInput, setSearchInput] = useState('');
const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = projectData.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  }
  else{
      setFilteredResults(projectData)
  }
}


  return (
   <>
   <Header/>
   <section class="background pt-1">
   <div class="bg-white p-4 m-4">
     <div class="d-flex justify-content-between mb-2">
            <h4 class="fw-bold">Projects</h4>
            <div class="d-flex ">
              <BiSearch className='fs-5 my-2 text-secondary ms-3 searchIcon'/>
              <input class="form-control-sm  me-2 ps-5 searchbar rounded-0" onChange={(e) => searchItems(e.target.value)} type="search" placeholder="Search Project"/>
              <NavLink to="/AddProject">
              <a href="" class="ms-3 Btn text-white btn btn-secondary rounded-0 border-0"><FaPlus className='me-2 mb-1'/>PROJECT</a> 
              </NavLink>
            </div>
     </div>
    <table class="table table-striped table-hover">
      <thead class="table-warning">
       <tr>
         <th>PROJECT NAME</th>
         <th>START DATE</th>
         <th>END DATE</th>
         <th>PROJECT MANAGER</th>
         <th className='text-center'>STATUS</th>
         <th></th>
       </tr>
      </thead>
      <tbody class="fw-bold">
      {searchInput.length > 1 ? (
        filteredResults.map((data) => {
         return (
        <tr>
          <td>{data.projectname}</td>
          <td>{DateFormate(data.startdate)}</td>
          <td>{DateFormate(data.enddate)}</td>
          <td>{data.projectmanager}</td>
          <td><div className="d-grid">
                <input type="button" size="lg" className='rounded-pill text-white  border-0 statusIcon' value={data.status}></input></div>
          </td>
          <td class="text-end text-secondary">
          <NavLink to={"/AddTask/"+ data.p_id} className="text-secondary">
             <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Task</Tooltip>}>
              <span className="d-inline-block"><MdLibraryAdd className='mx-2 fs-5 icon'/> </span>
              </OverlayTrigger>
              </NavLink>
             <NavLink to="/GanttChart" className="text-secondary">
             <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Chart</Tooltip>}>
              <span className="d-inline-block"><FaChartBar className='mx-2 fs-5 icon'/> </span>
              </OverlayTrigger>
              </NavLink> 
              <NavLink to="/EditProject" className="text-secondary">
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
              <span className="d-inline-block"> <FaPencilAlt  className='mx-2 fs-5 icon'  onClick={() => setData(data)}/></span>
              </OverlayTrigger>
              </NavLink>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
              <span className="d-inline-block"> <FaTrashAlt  className='mx-2 fs-5 icon' onClick={()=>handleShow(data.p_id) }/> </span>
              </OverlayTrigger>
          </td>
        </tr> 
        )})) : (projectData.length > 0 ? projectData.map((data) => {      
          return (
            <tr>
            <td>{data.projectname}</td>
            <td>{DateFormate(data.startdate)}</td>
            <td>{DateFormate(data.enddate)}</td>
            <td>{data.projectmanager}</td>
            <td><div className="d-grid">
                  <input type="button" size="lg" className='rounded-pill text-white  border-0 statusIcon' value={data.status}></input></div>
            </td>
            <td class="text-end text-secondary">
            <NavLink to={"/AddTask/"+ data.p_id} className="text-secondary">
             <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Task</Tooltip>}>
              <span className="d-inline-block"><MdLibraryAdd className='mx-2 fs-4 icon'/> </span>
              </OverlayTrigger>
              </NavLink>
               <NavLink to={"/GanttChart/"+ data.p_id} className="text-secondary">
               <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Chart</Tooltip>}>
                <span className="d-inline-block"><FaChartBar className='mx-2 fs-5 icon'/> </span>
                </OverlayTrigger>
                </NavLink> 
                <NavLink to="/EditProject" className="text-secondary">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                <span className="d-inline-block"> <FaPencilAlt  className='mx-2 fs-5 icon'  onClick={() => setData(data)}/></span>
                </OverlayTrigger>
                </NavLink>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                <span className="d-inline-block"> <FaTrashAlt  className='mx-2 fs-5 icon' onClick={()=>handleShow(data.p_id) }/> </span>
                </OverlayTrigger>
            </td>
          </tr> 
            )})  : <tr><td></td><td></td><td className='text-warning fw-bold py-3 text-center'>No Records Found</td><td></td><td></td><td></td></tr> )}
      </tbody>
    </table>
   </div>
</section>

             {/* Modal For Delete Button---------------- */}        
                <Modal show={show} onHide={handleClose} id="deleteModalBox">
                  <Modal.Header closeButton  id="deleteModal">
                     <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body id="deleteModal" >Are You Sure To Delete..?</Modal.Body>
                  <Modal.Footer  id="deleteModal">
                  <a  onClick={handleClose}> <Button variant="success" onClick={ () => {onDelete(infoId) }} >Yes</Button></a>
                   <Button variant="danger" onClick={handleClose}>No</Button>
                  </Modal.Footer>
                </Modal>
   
   </>
  )
}

export default Dashboard