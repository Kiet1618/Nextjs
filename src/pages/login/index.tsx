import { Input } from 'antd';
import React, { useState } from 'react';
import GoogleProvider from "next-auth/providers/google";
import { useAppDispatch } from '@app/store';
import { Button } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import {
    GooglePlusOutlined,
    FacebookOutlined,
    GithubOutlined,
    MoreOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const Login = styled.div`
    //background-image: url(/bg3.png);
  //  background-color: green;
    //background-repeat: no-repeat;
    //background-size: cover;
    //background-position: center;
    height: 100vh;
    //width: 100%;
    overflow: hidden;
    
`;
const IpnutLogin = styled.div`
    position: absolute;
    top:0;  
    min-width: 500px;
 
    text-align: center;
    padding-top: 10vh;
    height: 100vh;
    right: 0;
    /* background-image: url('/backgroundInputLogin.png'); */
    background-color: rgb(17,23,74, 0.2);
    /* background-color: black ; */
`;
const ImgBackground = styled.img`
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";
        min-height: 100vh;
        object-fit: cover;
`;

export default function App() {
    const { data: session } = useSession();

    const handleSubmit = async (event) => {

        event.preventDefault();
        const result = await signIn("google", {
            callbackUrl: `${window.location.origin}/overview`,
            redirect: false,
        })
    };
    //slider

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <Login>
            <Slider {...settings}>
                <ImgBackground src='/bg1.png'></ImgBackground>
                <ImgBackground src='/bg2.png'></ImgBackground>
                <ImgBackground src='/bg3.png'></ImgBackground>
            </Slider>
            <IpnutLogin>
                <img src="/logoLogin.png" style={{ marginBottom: 100 }} alt="" />
                <br></br>
                <Button style={{ margin: 10, width: 60, height: 60 }} type="default" size='large' shape='circle' icon={<img style={{ width: 50, height: 50 }} src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'></img>} onClick={handleSubmit}></Button>
                <Button style={{ margin: 10, width: 60, height: 60 }} type="default" size='large' shape='circle' icon={<FacebookOutlined />} ></Button>
                <Button style={{ margin: 10 }} type="default" size='large' shape='circle' icon={<GithubOutlined />} ></Button>
                <Button style={{ margin: 10 }} type="default" size='large' shape='circle' icon={<MoreOutlined />} ></Button>

                <Input.Group compact>
                    <Input style={{ width: 300, marginTop: 8, borderRadius: 5, textAlign: 'left', paddingLeft: 10, height: 40 }} /> <br></br>
                    <Button style={{ width: 300, marginTop: 5, borderRadius: 5, height: 40 }} type="primary" >Login with email</Button>

                </Input.Group>
            </IpnutLogin>

        </Login>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    return { props: { headers } }
}