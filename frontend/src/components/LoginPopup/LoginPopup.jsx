import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [otpSent, setOtpSent] = useState(false); // State to manage OTP step
  const [otp, setOtp] = useState(""); // To store OTP input by the user
  const [role, setRole] = useState("user"); // Default role is user

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onRoleChangeHandler = (event) => {
    setRole(event.target.value);
  };

  const onOtpChangeHandler = (event) => {
    setOtp(event.target.value);
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (currentState === "Sign Up") {
      if (data.password !== data.confirmPassword) {
        alert("Password and Confirm Password must match!");
        return;
      }

      if (!otpSent) {
        try {
          const response = await axios.post(url + "/api/user/register", { ...data, role });
          if (response.data.success) {
            alert("OTP sent to your email. Please verify.");
            setOtpSent(true);
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error("Error during registration:", error);
          alert("Something went wrong, please try again.");
        }
      } else {
        try {
          const response = await axios.post("http://localhost:3000/user/auth/signin", { email: data.email, otp });
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
      try {
        const response = await axios.post("http://localhost:3000/user/auth/signin", { email: data.email, password: data.password });
        console.log(response)
        if (response.data) {
          localStorage.setItem("at",response.data.access_token)
          setToken(response.data.access_token);
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
          <h2>{otpSent ? "Verify OTP" : currentState}</h2>
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
              {/* Radio buttons for role selection */}
              <div className="role-selection">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={onRoleChangeHandler}
                  />
                  User
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={onRoleChangeHandler}
                  />
                  Admin
                </label>
              </div>
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
              {/* Radio buttons for role selection */}
              <div className="role-selection">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={onRoleChangeHandler}
                  />
                  User
                </label>
                
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={onRoleChangeHandler}
                  />
                  Admin
                </label>
              </div>
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
