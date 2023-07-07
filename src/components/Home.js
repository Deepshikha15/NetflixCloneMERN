import React,{useEffect, useState} from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { useNavigate,useLocation} from 'react-router-dom';
import Navbar from './Navbar';
import Featured from './Featured';
import MovieList from './MovieList';

const HomeContainer = styled.div`
  background-color: #0b0b0b;
  overflor: hidden;
`

export default function Home({type}) {
    const location = useLocation();
    const [lists, setLists]= useState([]);
    const [genre,setGenre]= useState(null);


    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                    headers: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTVjNzVlMzc2YzU0MGM5ZmI5MWU4NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODYzNTQwNywiZXhwIjoxNjg5MDY3NDA3fQ.O8b_r8Mk-cTlxiOZn1ULmIED-i-N2ShrEUSivP5by7k" }
                });
                console.log(res.data)
                setLists(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getRandomLists();
    },[type, genre])

  return (
    <div>
      <HomeContainer>
      <Navbar/>
      <Featured type={type}/>
  
        {lists.map(list => <MovieList key={list._id} list={list} />)}
      
    </HomeContainer>
    </div>
  )
}