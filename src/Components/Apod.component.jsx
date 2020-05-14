import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import styled from "styled-components";
import {DateSingleInput} from '@datepicker-react/styled'

import bgImg from '../img/background-img.jpg';


const date = new Date();

const initialState = {
    date: date,
    showDatepicker: false,
  }

function reducer(state, action) {
    switch (action.type) {
      case 'focusChange':
        return {...state, showDatepicker: action.payload}
      case 'dateChange':
        return action.payload
      default:
        throw new Error()
    }
  }

 

function Apod() {
    // setState of the data
    const [apod, setApod] = useState([]);
    // setState for date
    const [state, dispatch] = useReducer(reducer, initialState)

    var datePicked = state.date;
    var dd = datePicked.getDate();
    
    var mm = datePicked.getMonth()+1; 
    var yyyy = datePicked.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    
    datePicked = yyyy+'-'+mm+'-'+dd;
    
    console.log('changes', datePicked);

    const [theDate, setTheDate] = useState(datePicked)
    console.log('thedate', theDate)
    // var dateSet = setTheDate(datePicked)
 

    // pull in data with a useEffect
    useEffect(() => {
        axios.get("https://api.nasa.gov/planetary/apod?api_key=pVzYAArvN8c8Fez9O5lg6h3ciz0pSOuEMCPKSNav&date=" + datePicked).then(response => {
            setApod(response.data);
        });
    }, []);

    // console log data to make sure its coming in
    console.log('data')

    
    


    // Styles
    const Container = styled.div`
        background: url(${bgImg}) no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    `;
    const Title = styled.div`
        color: purple;
        font-size: 3rem;
        background-color: whitesmoke;
        margin-bottom: 10px;
    `;
    const ImgContainer = styled.div`
        background-color: whitesmoke;
        border: 2px solid grey;
        border-radius: 10px;
        width: 40%;
        margin: 0 auto;
        padding: 2%;
    `;
    const Img = styled.img`
        width: 75%;
        height: 75%;
    `;
    const Explination = styled.div`
        padding: 1%;
        margin: 10px auto;
        width: 60%;
        background-color: #FFFAFA;
        border: 2px solid grey;
        border-radius: 10px;
        text-align: left;
    `;
    const Date = styled.div`
        text-align: center;
        padding-top: 10px;
    `;

    

    return (
        <Container className='container'>
            <Title className='title'>{apod.title}</Title>
            <ImgContainer className='imgContainer'>
            <DateSingleInput
                onDateChange={data => dispatch({type: 'dateChange', payload: data})}
                onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
                date={state.date} // Date or null
                showDatepicker={state.showDatepicker} // Boolean
            />
                {apod.media_type === "image" ? (
                    <Img className="image" alt={apod.title} src={apod.url} width='640' height='390' />
                ) : (
                    <iframe src={apod.url}  
                    width='640'
                    height='390'       
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title={apod.title} />
                )}
            </ImgContainer>
            <Explination className='explination'>
            
                {apod.explanation} 
                <br /> 
                <Date className="date" id='date'>{apod.date}</Date>
                <br /> 
                {apod.copyright}
            </Explination>
        </Container>
    );
}

export default Apod;