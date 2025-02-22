// import React,{useState} from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'
// import { useContext } from 'react'
// import { StoreContext } from '../../context/StoreContext'
// import axios from "axios"

// const LoginPopup = ({setShowLogin}) => {

//   const {url,setToken} = useContext(StoreContext)
//     const [currentState,setCurrentState] = useState("Login")


//     const [data,setData] = useState({
//       name:"",
//       email:"",
//       password:""
//     })
//     const onChangeHandler= (event)=>{
//       const name= event.target.name;
//       const value = event.target.value;
//       setData(data=>({...data,[name]:value}))

//     }


//     const onLogin = async (event)=>{
//       event.preventDefault()
//       let newUrl = url;
//       if(currentState=="Login"){
//         newUrl+="/api/user/login"
//       }
//       else{
//         newUrl+= "/api/user/register"
//       }

//       const response = await axios.post(newUrl,data);

//       if(response.data.success){
//         setToken(response.data.token);
//         localStorage.setItem("token",response.data.token)
//         setShowLogin(false)

//       }
//       else{
//         alert(response.data.message)
//       }
//     }

//     // useEffect(()=>{
//     //   console.log(data);
//     // },[data])


//     return (
//     <div className='login-popup'>
//         <form onSubmit={onLogin} className='login-popup-container'>
//           <div className="login-popup-title">
//             <h2>
//              {currentState}
//             </h2>
//             <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>
//           </div>
//           <div className="login-popup-input">
//             {currentState==='Login' ? <></> : <input name='name'onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required/>}
//             <input name='email'onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email' required/>
//             <input name='password'onChange={onChangeHandler} value={data.password} type='password' placeholder='Password' required/>

//           </div>
//           <button type='submit' >{currentState==="Sign Up"? 'Create Account' : 'Login'}</button>
//         <div className="login-popup-condition">
//             <input type="checkbox" required/>
//             <p> By continuing, i agree to the terms of use & privacy policy.</p>

//         </div>
//         {currentState==='Login'? 
//            <p>Create a new account ? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
//             :<p>Already have an account <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
//         }
//         </form>

//     </div>
//   )
// }

// export default LoginPopup



//   confirm pass

// import React, { useState, useContext } from 'react';
// import './LoginPopup.css';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';
// import axios from "axios";

// const LoginPopup = ({ setShowLogin }) => {
//   const { url, setToken } = useContext(StoreContext);
//   const [currentState, setCurrentState] = useState("Login");

//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "", // Added confirmPassword field
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const onLogin = async (event) => {
//     event.preventDefault();

//     if (currentState === "Sign Up" && data.password !== data.confirmPassword) {
//       alert("Password and Confirm Password must match!");
//       return;
//     }

//     let newUrl = url;
//     if (currentState === "Login") {
//       newUrl += "/api/user/login";
//     } else {
//       newUrl += "/api/user/register";
//     }

//     try {
//       const response = await axios.post(newUrl, data);
//       if (response.data.success) {
//         setToken(response.data.token);
//         localStorage.setItem("token", response.data.token);
//         setShowLogin(false);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error during login/registration:", error);
//       alert("Something went wrong, please try again.");
//     }
//   };

//   return (
//     <div className='login-popup'>
//       <form onSubmit={onLogin} className='login-popup-container'>
//         <div className="login-popup-title">
//           <h2>{currentState}</h2>
//           <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
//         </div>
//         <div className="login-popup-input">
//           {currentState === 'Login' ?  <><input
//             name='email'
//             onChange={onChangeHandler}
//             value={data.email}
//             type='email'
//             placeholder='Your Email'
//             required
//           />
//           <input name='password'
//             onChange={onChangeHandler}
//             value={data.password}
//             type='password'
//             placeholder='Password'
//             required
//           />
//           </> : (
//             <>
//               <input
//                 name='name'
//                 onChange={onChangeHandler}
//                 value={data.name}
//                 type='text'
//                 placeholder='Your Name'
//                 required
//               />
//               <input
//                 name='email'
//                 onChange={onChangeHandler}
//                 value={data.email}
//                 type='email'
//                 placeholder='Your Email'
//                 required
//               />
//               <input name='password'
//                 onChange={onChangeHandler}
//                 value={data.password}
//                 type='password'
//                 placeholder='Password'
//                 required
//               />
//               <input
//                 name='confirmPassword'
//                 onChange={onChangeHandler}
//                 value={data.confirmPassword}
//                 type='password'
//                 placeholder='Confirm Password'
//                 required
//               />
//             </>
//           )}
//           {/* <input
//             name='email'
//             onChange={onChangeHandler}
//             value={data.email}
//             type='email'
//             placeholder='Your Email'
//             required
//           />
//           <input name='password'
//             onChange={onChangeHandler}
//             value={data.password}
//             type='password'
//             placeholder='Password'
//             required
//           /> */}
//         </div>
//         <button type='submit'>
//           {currentState === "Sign Up" ? 'Create Account' : 'Login'}
//         </button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p> By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>
//         {currentState === 'Login' ? (
//           <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
//         ) : (
//           <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LoginPopup;


//sends otp on gamil

import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [otpSent, setOtpSent] = useState(false);  // State to manage OTP step
  const [otp, setOtp] = useState("");  // To store OTP input by the user

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onOtpChangeHandler = (event) => {
    setOtp(event.target.value); // Handle OTP input change
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (currentState === "Sign Up") {
      if (data.password !== data.confirmPassword) {
        alert("Password and Confirm Password must match!");
        return;
      }

      if (!otpSent) {
        // First step: Register user and send OTP
        try {
          const response = await axios.post(url + "/api/user/register", data);
          if (response.data.success) {
            alert("OTP sent to your email. Please verify.");
            setOtpSent(true);  // Move to OTP verification step
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error("Error during registration:", error);
          alert("Something went wrong, please try again.");
        }
      } else {
        // Second step: Verify OTP
        try {
          const response = await axios.post(url + "/api/user/verify-otp", { email: data.email, otp });
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error("Error during OTP verification:", error);
          alert("Something went wrong, please try again.");
        }
      }
    } else {
      // Login logic
      try {
        const response = await axios.post(url + "/api/user/login", data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong, please try again.");
      }
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{otpSent ? "Verify OTP" : currentState}</h2> {/* Update title based on OTP step */}
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <div className="login-popup-input">
          {currentState === 'Login' ? (
            <>
              <input
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                type='email'
                placeholder='Your Email'
                required
              />
              <input
                name='password'
                onChange={onChangeHandler}
                value={data.password}
                type='password'
                placeholder='Password'
                required
              />
            </>
          ) : otpSent ? (
            <input
              name='otp'
              onChange={onOtpChangeHandler}
              value={otp}
              type='text'
              placeholder='Enter OTP'
              required
            />
          ) : (
            <>
              <input
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                type='text'
                placeholder='Your Name'
                required
              />
              <input
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                type='email'
                placeholder='Your Email'
                required
              />
              <input
                name='password'
                onChange={onChangeHandler}
                value={data.password}
                type='password'
                placeholder='Password'
                required
              />
              <input
                name='confirmPassword'
                onChange={onChangeHandler}
                value={data.confirmPassword}
                type='password'
                placeholder='Confirm Password'
                required
              />
            </>
          )}
        </div>
        <button type='submit'>
          {otpSent ? "Verify OTP" : currentState === "Sign Up" ? 'Create Account' : 'Login'}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === 'Login' ? (
          <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

