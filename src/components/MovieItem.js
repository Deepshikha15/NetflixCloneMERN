import React,{useEffect,useState} from 'react'
import styled from 'styled-components';
import mov from '../static/download.jpeg';
import axios from 'axios';
import { Link } from 'react-router-dom'

import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from "@material-ui/icons";

const ItemContainer = styled.div`
    width: 225px;
    height: 120px;
    background-color: #0b0b0b;
    margin-right: 5px;
    overflow: hidden;
    cursor: pointer;
    color: white;
    &:hover {
        width: 325px;
        height: 300px;
        position: absolute;
        top: -150px;
        box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
        border-radius: 5px;
img {
            height: 140px;
        }
    }
`
const MainImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Video = styled.video`
    width: 100%;
    height: 140px;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
`
const ItemInfo = styled.div`
        display: flex;
        flex-direction: column;
        padding: 5px;
`
const IconsContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
.icon {
        border: 2px solid white;
        padding: 5px;
        border-radius: 50%;
        margin-right: 10px;
        font-size: 30px;
    }
        
`
const InfoTop = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: gray;
.limit {
        border: 1px solid gray;
        padding: 1px 3px;
        margin: 0 10px;
    }
`
const Description = styled.div`
    font-size: 13px;
    margin-bottom: 10px;
`
const Genre = styled.div`
    font-size: 14px;
    color: lightgray;`

export default function MovieItem({index,item}) {
    const [isHovered, setIsHovered] = useState(false);
    const trailer="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    const [movie, setMovie] = useState({});

    useEffect(() =>{
        const getMovie = async () => {
            try {
                const res = await axios.get("/movies/find/" + item,{
                    headers: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTVjNzVlMzc2YzU0MGM5ZmI5MWU4NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODYzNTQwNywiZXhwIjoxNjg5MDY3NDA3fQ.O8b_r8Mk-cTlxiOZn1ULmIED-i-N2ShrEUSivP5by7k" }
                })
                console.log(res.data)
                setMovie(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    },[item])

  return (
    <ItemContainer style={{ left: isHovered && index * 225 - 50 + index * 2.5 }} onMouseEnter={() =>setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <MainImage src={movie.img} alt="trailer" />
            {isHovered && (
                <>
                    <Video src={movie.trailer} autoPlay loop />
                    <ItemInfo>
                        <IconsContainer>
                            {/* <Link to={{ pathname: "/player" }} state={{movie: movie}}> */}
                            <Link to="/player" state={{movie:movie}}>
                                <PlayArrow className="icon" />
                            </Link>
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownOutlined className="icon" />
                        </IconsContainer>
                        <InfoTop>
                            <span>{movie.duration}</span>
                            <span className="limit">{movie.ageLimit}+</span>
                            <span>{movie.year}</span>
                        </InfoTop>
                        <Description>{movie.desc}</Description>
                        <Genre>{movie.genre}</Genre>
                    </ItemInfo>
                </>
            )}
        </ItemContainer>
  )
}
