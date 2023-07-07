import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import styled from "styled-components";

const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 100%
        ),
        url("http://mppmduse2pmpovwapp.azurewebsites.net/wp-content/uploads/2019/09/netflix-background-9.jpg");
    background-size: cover;
    position: relative;
`
const TopContainer = styled.div`
    .wrapper {
        padding: 20px 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .logo {
        height: 40px;
    }
`
const BottomContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`
const StyledForm = styled.form`
        width: 300px;
        height: 300px;
        padding: 30px;
        border-radius: 5px;
        background-color: #0b0b0b;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        input {
                height: 40px;
                border-radius: 5px;
               background-color:gray
                color: white;
                padding-left: 10px;
                
                
            }
        span {
                color: lightgray;
                b {
                    color: white;
                }
            }
`

const LoginButton = styled.button`
    height: 40px;
    border-radius: 5px;
    background-color: red;
    color: white;
    border: none;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
`
  
function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
   // const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    // useEffect(()=>{
    //     if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
    //         navigate("/dashboard");
    //     }
    //     console.log(localStorage.getItem('token'))
    // },[])
 
    const loginAction = (e) => {
        setValidationErrors({})
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            name:name,
            password:password,
        }
        axios.post('http://localhost:4000/api/auth/login', payload)
        .then((r) => {
            setIsSubmitting(false)
           // localStorage.setItem('token', r.data.token)
            navigate("/home");
        })
        .catch((e) => {
            setIsSubmitting(false)
            // if (e.response.data.errors != undefined) {
            //     setValidationErrors(e.response.data.errors);
            // }
            // if (e.response.data.error != undefined) {
            //     setValidationErrors(e.response.data.error);
            // }
        });
    }
 
     
    return (
        <div>
            {/* <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Sign In</h5>
                            <form onSubmit={(e)=>{loginAction(e)}}>
                                {Object.keys(validationErrors).length != 0 &&
                                     <p className='text-center '><small className='text-danger'>Incorrect Email or Password</small></p>
                                }
                                
                                <div className="mb-3">
                                    <label 
                                        htmlFor="name"
                                        className="form-label">
                                            Name
                                    </label>
                                    <input 
                                        type="name"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e)=>{setName(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="password"
                                        className="form-label">Password
                                    </label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button 
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block">Login</button>
                                    <p className="text-center">Don't have account? <Link to="/register">Register here</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
            <LoginContainer>
            <TopContainer>
                <div className="wrapper">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="netflix" className="logo" />
                </div>
            </TopContainer>
            <BottomContainer>
            <form onSubmit={(e)=>loginAction(e)}>
                <StyledForm>
                    <h1>Sign In</h1>
                    <input type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <LoginButton onClick={(e)=>loginAction(e)}>Sign In</LoginButton>
                    <span>New to Netflix? <b><Link to="/register">Sign up now.</Link></b></span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a
                        bot. <b>Learn more</b>.
                    </small>
                </StyledForm>
                </form>
            </BottomContainer>
        
        </LoginContainer>
        </div>
    );
}
   
export default Login;