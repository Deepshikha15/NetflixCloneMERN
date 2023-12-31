import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate,Link} from 'react-router-dom';
import { styled } from 'styled-components';



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
        background-color: gray;
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






export default function Login() {
    const history=useNavigate();
    const [name, setName]= useState();
    // const [email, setEmail]= useState();
    const [password, setPassword]= useState();

    async function handleClick(e){
        e.preventDefault();
        
        try{

            await axios.post("http://localhost:4000/login",{
                name,password
            })
            .then(res=>{
                console.log(res.data)
                if(res.data=="exist"){
                    alert("User have not sign up")
                }
                else if(res.data=="notexist"){
                    history("/home")
                    
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);

            })

        }
        catch(e){
            console.log(e);

        }
    }
  return (
    <>
    <div>
{/* 
        <h1>Login</h1>
        <form action="POST">
            <input type="name" id="name" onChange={(e)=>setName(e.target.value)}/>
        
            <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" onClick={handleClick}/>
        </form>
        <br/>
        <p>OR</p>
        <br/>
        <Link to="/register">Register yourself</Link>  */}

        <LoginContainer>
        <TopContainer>
                <div className="wrapper">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="netflix" className="logo" />
                </div>
            </TopContainer>
            <BottomContainer>
                <StyledForm>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or phone number" />
                    <input type="password" placeholder="Password" />
                    <LoginButton>Sign In</LoginButton>
                    <span>New to Netflix? <b>Sign up now.</b></span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a
                        bot. <b>Learn more</b>.
                    </small>
                </StyledForm>
            </BottomContainer>
        </LoginContainer>




 
				<section>
					<p
						//ref={errRef}
						// className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{/* {errMsg} */}
					</p>
					<h1>Sign In</h1>
					<form action='POST'>
						<label htmlFor="username">Username:</label>
						<input
							type="name"
							id="name"
							// ref={userRef}
							autoComplete="off"
							onChange={(e) => setName(e.target.value)}
							// value={user}
							required
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							// value={pwd}
							required
						/>
						<input type="submit" onClick={handleClick} value='Sign In'/>
					</form>
					<p>
						Need an Account?
						<br />
						<span className="line">
							<Link to="/register">Sign Up</Link>
						</span>
					</p>
				</section>

      
    </div>
    </>
  )
}