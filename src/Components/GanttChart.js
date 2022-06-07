import React,{useState,useEffect} from 'react';
import {FaChartBar,FaListAlt,FaArrowLeft,FaPlus,FaArrowsAltH} from 'react-icons/fa';
import {HiDotsVertical} from 'react-icons/hi';
import { OverlayTrigger,Tooltip } from 'react-bootstrap';
import {NavLink,useParams} from 'react-router-dom';
import Header from './Header'
import axios from'axios'
import {DateFormate} from './DateFormate'
import Chart from './Chart'

function GanttChart() {
    
// getting the data for the selected project----
const [projectdata, setProjectdata] = useState([]);
const params = useParams();
useEffect(() => {
 axios.get(`https://6295db8d810c00c1cb69856e.mockapi.io/Tasks/`)
     .then((response) => {      
        let data = response.data.filter(data=>data.p_id===params.id)
         setProjectdata(data); 
       })}, [params])
           
      
    
  return (
   <>
   
   <Header/>
   <div class="background pt-1">
    <div class="bg-white p-4 m-4 h-100">
        <div class="d-flex justify-content-between mb-2">
          <h4 class="fw-bold">Projects</h4>
          <div class="d-flex ">
          <NavLink to="/">
                <a href="../HTML/index.html" class="btn btn-secondary rounded-0"><FaArrowLeft className='me-2 mb-1'/>Back</a>
              </NavLink>
              <NavLink to={"/AddTask/"+ `${ localStorage.getItem('ID')}`}> 
               <a href=""class="ms-3 text-white btn Btn rounded-0 border-0"><FaPlus className='me-1 mb-1'/>TASK</a> 
               </NavLink>
          </div> 
        </div>
     <div class="row g-3 ">
      <div class="col-lg-6">
        <label class="form-label ">Project Name</label>
        <input type="text" class="form-control rounded-0" value={ localStorage.getItem('Project Name')}/>
      </div>
      <div class="col-lg-3">
        <label class="form-label ">Status</label>
        <select class="form-select form-control rounded-0" value={  localStorage.getItem('Status')}>
            <option selected disabled>Select</option>
            <option >Active</option>
            <option >Completed</option>
            <option >Delayed</option>
            <option >Inactive</option>
            <option >Not Started</option> 
        </select>
    </div>
    </div>
 </div>
 <div class="bg-white p-4 m-4 h-100">
  <div class="container-fluid d-flex justify-content-between mb-3">
   <div class="d-flex ">
    <small><span class="me-5 ">Project Name<br/><span class="fw-bold">{  localStorage.getItem('Project Name')}</span></span></small>
    <small><span class="ms-5 ">Start Date<br/><span class="fw-bold ms-5">{  localStorage.getItem('Start Date')}</span></span></small>
    <small><span class="ms-3 ">End Date<br/><span class="fw-bold ms-3">{  localStorage.getItem('End Date')}</span></span></small>
   </div>
   <div class="d-flex ">
     <div className='bg-warning text-white text-center pt-2 rounded-pill'mx-1 style={{width:"130px"}}>Active</div>
     <div className='bg-danger text-white text-center pt-2 rounded-pill mx-1' style={{width:"130px"}}>Delayed</div>
     <div className='bg-secondary text-white text-center pt-2 rounded-pill mx-1' style={{width:"130px"}}>Not Started</div>
     <div className='bg-success text-white text-center pt-2 rounded-pill mx-1' style={{width:"130px"}}>Completed</div>
    <a href="#" class="btn-sm  fw-bold Btn rounded-0 " type="button"> <FaChartBar class="fa-solid fa-chart-bar mx-2 pt-1 text-white fs-3"/></a>
    <a href="#" class="btn btn-light rounded-0 border border-warning text-white fw-bold text-decoration-none px-3"><FaListAlt  class="fa-solid fa-chart-bar text-secondary fs-4"/></a> 
   </div>
  </div> 
  <div class="gantt">
    <div class="gantt__row gantt__row--months">
        <div class="gantt__row-first"></div>
        <span>Jan'22</span><span>Feb'22</span><span>Mar'22</span>
        <span>Apr'22</span><span>May'22</span><span>Jun'22</span>
        <span>Jul'22</span><span>Aug'22</span><span>Sep'22</span>
        <span>Oct'22</span><span>Nov'22</span><span>Dec'22</span>
    </div>
    <div class="gantt__row gantt__row--lines" data-month="5">
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
    </div>
    <div class="gantt__row text-white">
    { projectdata.map(data=>{
        return(
         <>
         
        <div class={`gantt__row-first rounded-pill my-1 me-3 ${data.status}`}>
  
           <HiDotsVertical  class="position-absolute  start-0 pt-2 fs-3 pe-1" />
    
            {data.taskname}<br/><small>{DateFormate(data.startdate)} <FaArrowsAltH/> {DateFormate(data.enddate)}  Jenny Wilson</small>
         </div>
        
         <ul class="gantt__row-bars">          
            <li style={{gridColumn: `${new Date(data.startdate).getMonth()+1}/${new Date(data.enddate).getMonth()+1}`}} class={`${data.status} text-center`}>status</li>
        </ul> 
            </>
                )
            })
        }
       
    </div>
    
    </div>


</div>
</div> 
{/* <Chart/> */}
   </>
  )
}

export default GanttChart