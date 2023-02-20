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
const Login = styled.div`
    background-image: url(/home.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100%;
`;
const IpnutLogin = styled.div`
    text-align: center;
    padding-top: 40vh;
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


    return (
        <Login >
            <IpnutLogin>
                <Button style={{ margin: 10 }} type="default" size='large' shape='circle' icon={<GooglePlusOutlined />} onClick={handleSubmit}></Button>
                <Button style={{ margin: 10 }} type="default" size='large' shape='circle' icon={<FacebookOutlined />} ></Button>
                <Button style={{ margin: 10 }} type="default" size='large' shape='circle' icon={<GithubOutlined />} ></Button>
                <Button style={{ margin: 10 }} type="default" size='large' shape='circle' icon={<MoreOutlined />} ></Button>

                <Input.Group compact>
                    <Input style={{ width: 300 }} /> <br></br>
                    <Button style={{ width: 300 }} type="primary" >Login with email</Button>

                </Input.Group>
            </IpnutLogin>
        </Login>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    return { props: { headers } }
}