import axios from 'axios';
import React,{useState} from 'react'
import {useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";


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
`
const RegisterButton = styled.button`
    flex: 3;
    height: 100%;
    background-color: red;
    border: none;
    color: white;
    font-size: 22px;
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


export default function Register() {
    const history=useNavigate();
    const [name, setName]= useState();
    const [email, setEmail]= useState();
    const [password, setPassword]= useState();

    const [register, setRegister] = useState(false);

    const handleStart = () => {}
    const handleFinish = () => {}

    async function handleClick(e){
        e.preventDefault();
        
        try{
            await axios.post('/auth/register',{
                name,email,password
            }).then(res=>{
                if(res.data=="exist"){
                    alert("user already exist")
                }else if(res.data=="notexist"){
                    history("/home")
                }
            }).catch(e=>{
                alert("wrong details");
                console.log(e)
            } )
        }catch{
            console.log(e)
        }
    }
    

// const handleSubmit = async(e) => {
//     // prevent the form from refreshing the whole page
//     e.preventDefault();
//     // make a popup alert showing the "submitted" text
//     const configuration = {
//         method: "post",
//         url: "http://localhost:4000/api/auth/register",
//         data: {
//           email,
//           password,
//         },
//       };
//       axios(configuration)
//       .then((result) => {
//         setRegister(true);
//       })
//       .catch((error) => {
//         error = new Error();
//       });


//     // try{
//     //     await axios.post('http://localhost:4000/api/auth/register',{
//     //         name,email,password
//     //     }).then(res=>{
//     //         console.log(res);
//     //         // if(res.data=="exist"){
//     //         //     alert("user already exist")
//     //         // }else if(res.data=="notexist"){
//     //         //     history("/home")
//     //         // }
//     //     }).catch(e=>{
//     //         alert("wrong details");
//     //         console.log(e)
//     //     } )
//     // }catch{
//     //     console.log(e)
//     // }
//   }

  return (
    <>

     <h1>Register</h1>
    <form action="POST">
            <input type="name" id="name" onChange={(e)=>setName(e.target.value)}/>
            <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" onClick={handleClick}/>
        </form>
        <br/>
        <p>OR</p>
        <br/>
        <Link to="/login">Login yourself</Link> 
    </>
  )
}