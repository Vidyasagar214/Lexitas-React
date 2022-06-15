import React,{useState,useEffect} from 'react'
import {FaArrowLeft,FaPlus} from 'react-icons/fa'
import {MdSave} from 'react-icons/md';
import {NavLink} from 'react-router-dom';
import Header from './Header';
import {Modal,Button} from 'react-bootstrap';
import Select,{ StylesConfig } from 'react-select'
import axios from 'axios';

function AddProject() {

 // //Adding input----------------
 const [projectname, setProjectname] = useState('');
 const [startdate, setStartdate] = useState('');
 const [enddate, setEnddate] = useState('');
 const [status, setStatus] = useState('');
 const [division, setDivision] = useState('');
 const [projectmanager, setProjectmanager] = useState('');
 const [projectmembers, setProjectmembers] = useState([]);
 const [description, setDescription] = useState('');
 const [error, setError] = useState('');
  
 
 
 const postData = (e) => {
   e.preventDefault();
   if(projectname==="" && startdate==="" && enddate==="" && status==="" &&
   division==="" && projectmanager==="" && projectmembers==="" && description==="") {
     setError("All Fields Are Required to be filled.");
     return false;
   }
   if(projectname.trim()==="") {
     setError("Project Name must be Filled.");
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
  if(division==="") {
    setError("Please Make A Selection from Division");
    return false;
  }
  if(projectmanager==="") {
    setError("Please Make A Selection from Project Manager");
    return false;
  }
  if(projectmembers==="") {
    setError("Please Make Selection from Project Members");
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
       axios.post(`https://6295db8d810c00c1cb69856e.mockapi.io/Projects`, {
       projectname,startdate,enddate,status,division,projectmanager,projectmembers,description
       })
       handleShow()
        return true;
     }}

       
// for Add modal------------------------
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

     const options = [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'Jimmy Carter', label: 'Jimmy Carter' },
      { value: 'Loius', label: 'Loius' },
      { value: 'Van Persey', label: 'Van Persey' },
      { value: 'Travis ', label: 'Travis' },
      { value: 'Jamisaon', label: 'Jamisaon' }
    ];
    const colourStyles = {
      control: (styles) => ({ ...styles, borderRadius: '0px' })}

  return (
   <>
   <Header/>
   <div class="background pt-1">
   <div class="bg-white p-4 m-4">
        <div class="d-flex justify-content-between mb-2">
            <h4 class="fw-bold">Projects</h4>
            <div class="d-flex ">
            <NavLink to="/">
                <a href="../HTML/index.html" class="btn btn-secondary rounded-0"><FaArrowLeft className='me-2 mb-1'/>Back</a>
              </NavLink>
            </div>
         </div>
       <form>
      <div class="row mb-4">
        <div class="col-lg-12">
            <label for="taskname" class="form-label">Project Name</label>
            <input type="text" class="form-control rounded-0" id="taskname" onChange={(e) => setProjectname(e.target.value)}/>
        </div>
      </div> 
      <div class="row mb-4">
        <div class="col-xl-2">
            <label for="taskname" class="form-label">Start Date</label>
                <input type="date" class="form-control rounded-0 form-control" onChange={(e) => setStartdate(e.target.value)}/>
        </div>
        <div class="col-xl-2">
            <label for="taskname" class="form-label">End Date</label>
                <input type="date" class="form-control rounded-0 form-control" onChange={(e) => setEnddate(e.target.value)}/>
        </div>
        <div class="col-xl-2">
            <label for="taskname" class="form-label">Status</label>
              <select class="form-select rounded-0" onChange={(e) => setStatus(e.target.value)}>
                <option selected disabled>Select</option>
                <option>Active</option>
                <option>Delayed</option>
                <option>Not Started</option>
                <option>Completed</option>
              </select> 
        </div>
        <div class="col-xl-3">
            <label for="taskname" class="form-label">Division</label>
              <select class="form-select rounded-0" onChange={(e) => setDivision(e.target.value)}>
                <option selected disabled>Select</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select> 
        </div>
        <div class="col-xl-3">
            <label for="taskname" class="form-label">Project Manager</label>
            <select class="form-select rounded-0" onChange={(e) => setProjectmanager(e.target.value)}>
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
    </div>
    <div class="row mb-4">
        <div class="col-xl-6">
            <label for="taskname" class="form-label">Project Members</label>
                <Select   styles={colourStyles} options={options}  isMulti={true} onChange={(options)=>{setProjectmembers(options.map(x=>x.value))}} />
        </div>
            <div class="col-xl-6">
                <label for="" class="form-label">Description</label>
                <textarea class="form-control  rounded-0" rows="4" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
        </div>
        </form>
        {error&&<p className='text-danger fst-italic'>{error}</p>}
            <div class="col-xl d-flex flex-row-reverse text-white">
                <button class="ms-3 text-white btn Btn rounded-0 border-0"type='submit' onClick={postData}><MdSave className='me-1 mb-1 fs-5'/>SAVE</button>
            </div>

    </div>                      
   </div>


                {/* Modal For Successful save and adding task ---------------- */}        
                <Modal show={show} >
                  <Modal.Body >Project Added Successfully.
                  <NavLink to='/' ><Button variant="success" className='float-end btn-sm ' onClick={handleClose} >Ok</Button></NavLink>
                  </Modal.Body>
                  </Modal>
   
   </>
  )
}

export default AddProject