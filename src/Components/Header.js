import React from 'react';
import {NavLink} from 'react-router-dom'

function Header() {
  return (
   <>
     <div className='bg-white'>
     <div class="col d-flex justify-content-between align-item-center ">
        <div class="d-flex align-item-center ms-2">
           <img class="logo m-2" src="../Images/Lexitas-logo-new-gray.png" alt="no pic"/>
           <p class="lead text-muted fs-4 fw-bold m-1 px-3 pt-2 pb-0 border-start">PROJECT MANAGEMENT</p>
        </div>
        <div class="d-flex align-item-center me-2">
            <p class="text-muted py-3 fs-6 fw-bold px-1 m-0">Brooklyn Simmons</p>
            <img class="rounded-circle mt-1" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z3V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500" width="45" height="45" alt=""/>
        </div>
    </div>

<nav class="navbar navbar-expand-lg navbar-light border-top border-danger">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end pe-1" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <NavLink to="/" activeClassName="active" className='px-3 py-2 text-decoration-none navigation'>HOME</NavLink>
          <NavLink to="/AddProject" activeClassName="active" className='px-3 py-2 text-decoration-none navigation'>ADD PROJECT</NavLink>
          <NavLink to="Logout" className='px-3 py-2 text-decoration-none navigation'>LOGOUT</NavLink>
          
        </div>
      </div>
    </div>
  </nav>
     </div>
   </>
  )
}

export default Header