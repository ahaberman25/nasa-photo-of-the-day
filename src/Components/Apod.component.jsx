import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import bgImg from '../img/background-img.jpg'


function Apod() {
    // setState of the data
    const [apod, setApod] = useState([]);

    // pull in data with a useEffect
    useEffect(() => {
        axios.get("https://api.nasa.gov/planetary/apod?api_key=pVzYAArvN8c8Fez9O5lg6h3ciz0pSOuEMCPKSNav").then(response => {
            setApod(response.data);
        });
    }, []);

    // console log data to make sure its coming in
    console.log(apod)

    // Styles
    const Container = styled.div`
        width: 100vw;
        height: 100vh;
        background-image: url(${bgImg});
    `;
    const Title = styled.div`
        color: purple;
        font-size: 40px;
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
        <Container>
            <Title>{apod.title}</Title>
            <ImgContainer>
                {apod.media_type === "image" ? (
                    <img className="image" alt={apod.title} src={apod.url} width='640' height='390' />
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
            <Explination>
                {apod.explanation} 
                <br /> 
                <Date className="date">{apod.date}</Date>
                <br /> 
                {apod.copyright}
            </Explination>
        </Container>
    );
}

export default Apod;