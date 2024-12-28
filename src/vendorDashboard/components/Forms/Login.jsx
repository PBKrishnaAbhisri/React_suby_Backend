import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleLogin = async(e)=>{
      e.preventDefault();
      try {
        const response = await fetch(`${API_URL}/vendor/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
              })
              console.log(response)
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Vendor Login successfully");
        
        setEmail("");
        setPassword(""); 
        localStorage.setItem('loginToken', data.token);
        showWelcomeHandler();

      }
      const vendorId = data.vendorId;
      console.log("checking for vendor id:" , vendorId);
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      window.location.reload();
      const vendorData = await vendorResponse.json();
          if(vendorResponse.ok){
            const vendorFirmId = vendorData.vendorFirmId;
            const vendorFirmName = vendorData.vendor.firm[0].firmName;
            localStorage.setItem('firmId', vendorFirmId);
            localStorage.setItem('firmName', vendorFirmName);
            
            window.location.reload()
            console.log('refer');
          }
      } catch (error) {
        console.error("Login failed", error);
        alert("Login failed. Please try again later.");
      }

    }
  return (
    <div className='loginSection'>
        
        <form className='authForm'onSubmit={HandleLogin}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email' /><br />
            <label >password</label>
            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password' /><br />
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
        </div>
  )
}

export default Login