
import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showLogOut, showlogOutHandler}) => {
  const firmName = localStorage.getItem('firmName');
  console.log(showLogOut);
  console.log(showlogOutHandler)

  return (
    <div className='navSection'>
        <div className="company">
            Vendor Dashboard
        </div>
        <div className="firmName">
            <h4>Firname : {firmName}</h4>
        </div>
        <div className="userAuth">
        {!showLogOut ?  <>
           <span onClick={showLoginHandler}>Login / </span>
          <span onClick={showRegisterHandler}>Register</span>
          </> : <span onClick={showlogOutHandler} className='logout' >Logout</span>  }
        </div>

    </div>
  )
}

export default Navbar