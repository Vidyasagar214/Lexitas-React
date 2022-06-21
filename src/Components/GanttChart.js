import React,{useState,useEffect} from 'react';
import {FaChartBar,FaListAlt,FaArrowLeft,FaPlus,FaArrowsAltH, FaEdit,FaTrashAlt} from 'react-icons/fa';
import { OverlayTrigger,Tooltip } from 'react-bootstrap';
import {NavLink,useParams} from 'react-router-dom';
import Header from './Header'
import axios from'axios'
import {DateFormate} from './DateFormate'

function GanttChart() {
  const params = useParams();  
// getting the data for the selected project----
const [taskdata, setTaskdata] = useState([]);
const [paraId,setParaId] = useState(params.id);
const [status, setStatus] = useState('all');
const [projectData,setProjectData]=useState([]);
const [parProjectData,setParProjectData]=useState();

let filterStatus=(data,statusName)=>{
  let statusFilter = data.filter(d=>d.status === statusName)
  setTaskdata(statusFilter);  
}

useEffect(() => {   
       axios.get(`https://6295db8d810c00c1cb69856e.mockapi.io/Tasks/`)
      .then((response) => {      
        let data = response.data.filter(data=>data.p_id===paraId)
        switch(status){
          case 'Active':
          filterStatus(data,'Active')
          break;
          case 'Delayed':
          filterStatus(data,'Delayed')
          break;
          case 'Not Started':
          filterStatus(data,'Not Started')
          break;
          case 'Completed':
          filterStatus(data,'Completed')
          break;
          default:setTaskdata(data);
        }
       })
       axios.get('https://6295db8d810c00c1cb69856e.mockapi.io/Projects')
          .then((response)=>{
            projectfilter(response.data,paraId)
            setProjectData(response.data)
          })
          projectfilter(projectData,paraId)
      }, [paraId,status]);
      let projectfilter = (project,id) =>{
        let data = project.filter(d=>d.p_id==id)
        setParProjectData(data[0])
      }   
      

 // for editing the data----
 const setData = (data) => {
  let {id,taskname,startdate,enddate,status,priority,taskowner,description} = data;
  localStorage.setItem('ID', id);
  localStorage.setItem('Task Name', taskname);
  localStorage.setItem('Start Date', startdate);
  localStorage.setItem('End Date', enddate);
  localStorage.setItem('Status', status);
  localStorage.setItem('Priority', priority);
  localStorage.setItem('Task Owner', taskowner);
  localStorage.setItem('Description', description);
}

//  for deleting data-----
const onDelete = (id) => {
  axios.delete(`https://6295db8d810c00c1cb69856e.mockapi.io/Tasks/${id}`)
  .then(() => {
    getData();

})

}

  // to load the data after delete---
  const getData = () => {
    axios.get(`https://6295db8d810c00c1cb69856e.mockapi.io/Tasks/`)
    .then((response) => {      
      let data = response.data.filter(data=>data.p_id===paraId)
      setTaskdata(data)
    })
  }



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
              <NavLink to={"/AddTask/"+ paraId}> 
               <a href=""class="ms-3 text-white btn Btn rounded-0 border-0"><FaPlus className='me-1 mb-1'/>TASK</a> 
               </NavLink>
          </div> 
        </div>
     <div class="row g-3 ">
      <div class="col-lg-6">
        <label class="form-label ">Project Name</label>
        <select class="form-select form-control rounded-0" value={paraId} onChange={(e) => setParaId(e.target.value)}>
            <option selected disabled>Select</option>
           {projectData.map((data)=>{
            return(
            <>          
            <option value={data.p_id}>{data.projectname}</option> 
            </>
            )
          })}
        </select>
      </div>
      <div class="col-lg-3">
      <label for="taskname" class="form-label">Status</label>
              <select class="form-select rounded-0" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option selected disabled>Select</option>
                <option value='all'>All</option>
                <option value='Active'>Active</option>
                <option value='Delayed'>Delayed</option>
                <option value='Not Started'>Not Started</option>
                <option value='Completed'>Completed</option> 
              </select>
    </div>
    </div>
 </div>
 <div class="bg-white p-4 m-4 h-100">
  <div class="container-fluid d-flex justify-content-between mb-3">
   <div class="d-flex ">
    <small><span class="me-5 ">Project Name<br/><span class="fw-bold">{parProjectData?.projectname}</span></span></small>
    <small><span class="ms-5 ">Start Date<br/><span class="fw-bold ms-5">{DateFormate(parProjectData?.startdate)}</span></span></small>
    <small><span class="ms-3 ">End Date<br/><span class="fw-bold ms-3">{DateFormate(parProjectData?.enddate)}</span></span></small>
   </div>
   <div class="d-flex ">
     <div className='bg-warning text-white text-center pt-2 rounded-pill mx-1' style={{width:"130px",cursor:"pointer"}}  onClick={() => setStatus("Active")}>Active</div>
     <div className='bg-danger text-white text-center pt-2 rounded-pill mx-1' style={{width:"130px",cursor:"pointer"}} onClick={() => setStatus("Delayed")}>Delayed</div>
     <div className='bg-secondary text-white text-center pt-2 rounded-pill mx-1' style={{width:"130px",cursor:"pointer"}} onClick={() => setStatus("Not Started")}>Not Started</div>
     <div className='bg-success text-white text-center pt-2 rounded-pill mx-1' style={{width:"130px",cursor:"pointer"}} onClick={() => setStatus("Completed")}>Completed</div>
     <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Chart View</Tooltip>}>
    <a href="#" class="btn-sm  fw-bold Btn rounded-0 " type="button"> <FaChartBar class="fa-solid fa-chart-bar mx-2 pt-1 text-white fs-3"/></a>
    </OverlayTrigger>
    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">List View</Tooltip>}>
    <a href="#" class="btn btn-light rounded-0 border border-warning text-white fw-bold text-decoration-none px-3"><FaListAlt  class="fa-solid fa-chart-bar text-secondary fs-4"/></a> 
    </OverlayTrigger>
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

    { taskdata.map(data=>{
        var date1 = new Date(data.startdate);
        var date2 = new Date(data.enddate);
        var date3 = new Date("01/01/2022");
        var date4 = new Date();
        var time = date2.getTime() - date1.getTime();
        var days = time / (1000 * 3600 * 24);
        var time2 = date1.getTime() - date3.getTime();
        var days2 = time2 / (1000 * 3600 * 24);
        var time3 = date4.getTime() - date1.getTime();
        var days3 = parseInt(time3 / (1000 * 3600 * 24));

      var entering = (e) => {
          e.children[0].style.borderTopColor = 'green';
          e.children[1].style.backgroundColor = 'lightgrey';
          e.children[1].style.color = 'black';
      };
        return(
         <>
       
        {/* <div class={`gantt__row-first rounded-pill my-1 me-3 ${data.status}`} > */}
        <div class="gantt__row text-white">
                  <span className='position-absolute'>
                  <NavLink to={"/EditTask/"+ paraId} className="text-white">
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit </Tooltip>}>
                     <span >
                    <FaEdit  class="fs-4 mt-2 py-1 ms-1 icon" style={{cursor:"pointer"}}  onClick={() => setData(data)}/>
                    </span>
                  </OverlayTrigger>
                  </NavLink>
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete </Tooltip>}>
                     <span>
                    <FaTrashAlt  class="fs-4 mt-2 py-1 pe-2 icon" style={{cursor:"pointer"}} onClick={ () => {onDelete(data.id) }}/>
                    </span>
                  </OverlayTrigger>
                  </span>

           <div class={`gantt__row-first rounded-pill ps-5  my-1 me-3 ${data.status}`}>
         
           {data.taskname}<br/><small>
            {DateFormate(data.startdate)} <FaArrowsAltH/> {DateFormate(data.enddate)}{"   "}
             {data.taskowner}</small>
           
           </div>
         </div>
       
         <ul class="gantt__row-bars"> 
        
          <OverlayTrigger  overlay={<Tooltip id="tooltip-disabled">{DateFormate(data.startdate)} <FaArrowsAltH/> {DateFormate(data.enddate)}<br></br>{data.status} <br></br>{`${days} days`}<br></br>{data.description}</Tooltip>} onEntering={entering}>         
            <li  style={{marginLeft:`${days2*2.64}px`,width:`${days*2.64}px`}} class={`${data.status} text-start pe-1 Bar`} >
               
                
                </li>
               
            </OverlayTrigger>
            <OverlayTrigger  overlay={<Tooltip id="tooltip-disabled">{DateFormate(data.startdate)} <FaArrowsAltH/> {DateFormate(data.enddate)}<br></br>{data.status} <br></br>{`${days} days`}<br></br>{data.description}</Tooltip>} onEntering={entering}>         
            <span class={`${data.status} rounded-pill pb-1 pe-2 position-absolute`} style={{paddingLeft:`${days}px`,marginLeft:`${days2*2.64}px`,cursor:"pointer"}} > {`${days3}`}</span>
            </OverlayTrigger>
        </ul> 
        
            </>
                ) })}
         </div>
    
    </div>


</div>
</div> 
               
   </>
  )
}

export default GanttChart