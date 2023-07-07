import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import styled from "styled-components";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL

const RegisterContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 100%
        ),
        url("https://cdn.hipwallpaper.com/i/98/21/dUyCkp.jpg");
    background-size: cover;
    position: relative;
`;
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
    h1 { font-size: 50px; }
    h2 { margin: 20px; }
    p { font-size: 20px; }
`
const LoginButton = styled.button`
    background-color: red;
    border: none;
    color: white;
    border-radius: 5px;
    padding: 5px 15px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    zindex:1001;
`


const RegisterButton = styled.button`
    flex: 3;
    height: 100%;
    background-color: red;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
`
const StyledForm = styled.form`
    width: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    height: 50px;
    border-radius: 5px;
    input{
        flex: 9;
        height: 100%;
        border: none;
        padding: 0 10px;
    }
`

// const LoginButton = styled.button`
//     height: 40px;
//     border-radius: 5px;
//     background-color: red;
//     color: white;
//     border: none;
//     font-size: 18px;
//     font-weight: 500;
//     cursor: pointer;
// `

  
function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    //const [confirmPassword, setConfirmPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    // useEffect(()=>{
    //     if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
    //         navigate("/dashboard");
    //     }
    // },[])
 
    const registerAction = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            name: name,
            email:email,
            password:password,
            //password_confirmation:confirmPassword
        }
        axios.post('http://localhost:4000/api/auth/register', payload)
        .then((r) => {
            console.log("r",r.data)
            setIsSubmitting(false)
           // localStorage.setItem('token', r.data.token)
            navigate("/home");
        })
        .catch((e) => {
            setIsSubmitting(false)
            // if (e.response.data.errors != undefined) {
            //     setValidationErrors(e.response.data.errors);
            // }
        });
    }

    // const handleClick = () => {
    //     alert("clicked");
    //   };
     
    return (
            <div>
            <RegisterContainer>
            
                <TopContainer>
                    <div className="wrapper">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="netflix" className="logo" />
                       
                            
                        
                        {/* <input type="button" onClick={() => console.log("Hello")} value="SignIn"/> */}
                    </div>
                    
                </TopContainer>
                
                
                <BottomContainer>
                
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <p>
                        Ready to watch? Enter your email to create or restart your membership.
                    </p>
                    {/* {!email ? ( */}
                    <form onSubmit={(e)=>registerAction(e)}>
                        <StyledForm>
                            <input type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            {/* <RegisterButton onClick={handleStart}>Get Started</RegisterButton>
                        </StyledForm>
                    ) : (
                        <StyledForm> */}
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <RegisterButton onClick={(e)=>registerAction(e)}>Start</RegisterButton>
                            {/* <RegisterButton ></RegisterButton> */}
                            
                        </StyledForm>
                    </form><br/>
                    <span>Login ? <LoginButton onClick={(e)=>{navigate("/login")}}>Login</LoginButton></span>
                    
                    {/* )} */}
                </BottomContainer>
        </RegisterContainer>
    </div>
    );
}
   
export default Register;