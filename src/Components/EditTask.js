import React,{useState,useEffect} from 'react';
import {FaArrowLeft,FaPlus} from 'react-icons/fa';
import {MdSave} from 'react-icons/md';
import {NavLink,useParams} from 'react-router-dom';
import {Button,Modal} from 'react-bootstrap'
import Header from './Header'
import axios from 'axios';

function EditTask() {

// getting the data for the selected project----
const [projectdata, setProjectdata] = useState([]);
const params = useParams();
useEffect(() => {
 console.log(params);
 axios.get(`https://6295db8d810c00c1cb69856e.mockapi.io/Projects/${params.id}`)
     .then((response) => {      
         setProjectdata(response.data);
         console.log(response.data)
       })}, [params.id])


 // //Adding input-----------------
 const [id, setId] = useState('');
 const [taskname, setTaskname] = useState('');
 const [startdate, setStartdate] = useState('');
 const [enddate, setEnddate] = useState('');
 const [status, setStatus] = useState('');
 const [taskowner, setTaskowner] = useState('');
 const [priority, setPriority] = useState('');
 const [description, setDescription] = useState('');
 const [error, setError] = useState('');
  
 const updateTask = (e) => {
   e.preventDefault();
   if(taskname==="" && startdate==="" && enddate==="" && status==="" &&
   taskowner==="" && priority==="" && description==="") {
     setError("All Fields Are Required to be filled.");
     return false;
   }
   if(taskname.trim()==="") {
     setError("Task Name must be Filled.");
     return false;
   }
   if(startdate===""){
     setError("Please select the Start Date.");
     return false;
   }
   if(enddate==="") {
     setError("Please select the End Date");
     return false;
   }
   if(status==="") {
    setError("Please Make A Selection from Status");
    return false;
  }
  if(taskowner==="") {
    setError("Please Make A Selection for Task Owner");
    return false;
  }
  if(priority==="") {
    setError("Please Select a priority");
    return false;
  }
  if(description.trim()==="") {
    setError("Give Some Description.");
    return false;
  }
  if(Date.parse(enddate) <= Date.parse(startdate)){
    setError("End Date must be greater than StartDate")
  }
   else{
       axios.put(`https://6295db8d810c00c1cb69856e.mockapi.io/Tasks/${id}`, {
       taskname,startdate,enddate,status,taskowner,priority,description,
       
       })
       handleShow()
       return true;
     }}

      //  getting the data of particular editable project----
      useEffect(() => {
        setId(localStorage.getItem('ID'))
          setTaskname(localStorage.getItem('Task Name'));
          setStartdate(localStorage.getItem('Start Date'));
          setEnddate(localStorage.getItem('End Date'));
          setPriority(localStorage.getItem('Priority'));
          setTaskowner(localStorage.getItem('Task Owner'));
          setStatus(localStorage.getItem('Status'));
          setDescription(localStorage.getItem('Description'));
      }, []);

             
// for Add modal------------------------
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


  return (
  <>
  <Header/>
  <div class="background pt-1">
   <div class="bg-white p-4 m-4">
     <div class="d-flex justify-content-between mb-2">
          <h5>Edit Task for Project '<strong>{projectdata.projectname}</strong>'</h5>
          <div class="d-flex ">
              <NavLink to={"/GanttChart/"+ params.id}>
                <button class="btn btn-secondary rounded-0 border-0"><FaArrowLeft className='me-2 mb-1'/>Back</button>
                </NavLink>
            </div>
     </div>
      <form> 
     <div class="row g-3 mb-4">
            <div class="col-xl-6">
                <label for="taskname" class="form-label">Task Name</label>
                <input type="text" class="form-control rounded-0" id="taskname" value={taskname} onChange={(e) => setTaskname(e.target.value)}/>
            </div>
            <div class="col-xl-2">
                <label for="taskname" class="form-label">Start Date</label>
                    <input type="date" class="form-control rounded-0 form-control" value={startdate}  onChange={(e) => setStartdate(e.target.value)} />
            </div>
            <div class="col-xl-2">
                <label for="taskname" class="form-label">End Date</label>
                    <input type="date" class="form-control rounded-0 form-control" value={enddate}  onChange={(e) => setEnddate(e.target.value)}/>
            </div>
            <div class="col-xl-2">
                <label for="taskname" class="form-label">Status</label>
                  <select class="form-select rounded-0" value={status}  onChange={(e) => setStatus(e.target.value)}>
                    <option selected disabled>Select</option>
                    <option>Active</option>
                    <option>Delayed</option>
                    <option>Not Started</option>
                    <option>Completed</option>
                  </select> 
            </div>
            </div>
            <div class="row g-3 mb-4">
            <div class="col-xl-3">
                <label for="taskname" class="form-label">Task Owner</label>
                <select class="form-select rounded-0" value={taskowner}  onChange={(e) => setTaskowner(e.target.value)}>
                    <option selected disabled>Select</option>
                    <option>John Doe</option>
                    <option>JImmy Carter</option>
                    <option>Nelson Moody</option>
                    <option>Jofra Archer</option>
                    <option>Peter Pan</option>
                    <option>Dwyane Johnson</option>
                    <option>James Hill</option>
                  </select>
            </div>
            <div class="col-xl-3">
                <label for="taskname" class="form-label">Priority</label>
                <select class="form-select  rounded-0" value={priority}  onChange={(e) => setPriority(e.target.value)}>
                    <option selected disabled>Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>         
            </div>
            <div class="col-xl-6">
                <label for="" class="form-label">Description</label>
                <textarea class="form-control rounded-0" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
        </div>
        </form>
        {error&&<p className='text-danger fst-italic'>{error}</p>}
        <div class="col-xl d-flex flex-row-reverse text-white">
             
               <button disabled class="ms-3 text-white btn Btn rounded-0 border-0"><FaPlus className='me-1 mb-1'/>SAVE & ADD NEW TASK</button> 
                <button class="ms-3 text-white btn Btn rounded-0 border-0" type='submit' onClick={updateTask}><MdSave className='me-1 mb-1 fs-5'/>SAVE</button>
                        
            </div>
       
    </div>               
    </div>

{/* Modal For Successful save and adding task ---------------- */}        
                 <Modal show={show} id="deleteModalBox">
                  <Modal.Body id="deleteModal" >Task Updated Successfully.
                  <NavLink to={"/GanttChart/"+ params.id} ><Button variant="success" className='float-end btn-sm ' onClick={handleClose} >Ok</Button></NavLink>
                  </Modal.Body>
                  </Modal>
  
  
  </>
  )
}

export default EditTask