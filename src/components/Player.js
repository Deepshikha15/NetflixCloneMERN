import { ArrowBackOutlined } from '@material-ui/icons'
import React,{useEffect} from 'react';
import { styled } from 'styled-components';
import { Link, useLocation } from "react-router-dom";


const PlayerComponent = styled.div`
    width: 100vw;
    height: 100vh;
    .back {
        display: flex;
        align-items: center;
        position: absolute;
        top: 10px;
        left: 10px;
        color: white;
        cursor: pointer;
        z-index: 2;
    }
    .video {
        width: 100%;
        height: 100% !important;
        object-fit: cover;
    }
`
 
export default function Player({state}) {
    const location = useLocation();
    const movie = location.state.movie;

    useEffect(()=>{    
        console.log("location",location);  
      },[]);

    return (
        <PlayerComponent>
            <Link to="/home">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video className="video" autoPlay progress controls src={movie.video} />
        </PlayerComponent>
    )
}
