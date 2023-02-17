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
import './login.css';


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
        <div className='login-form' >
            <div className='input-login'>
                <Button className='icon-login' type="default" size='large' shape='circle' icon={<GooglePlusOutlined />} onClick={handleSubmit}></Button>
                <Button className='icon-login' type="default" size='large' shape='circle' icon={<FacebookOutlined />} ></Button>
                <Button className='icon-login' type="default" size='large' shape='circle' icon={<GithubOutlined />} ></Button>
                <Button className='icon-login' type="default" size='large' shape='circle' icon={<MoreOutlined />} ></Button>

                <Input.Group compact>
                    <Input style={{ width: 300 }} /> <br></br>
                    <Button style={{ width: 300 }} type="primary" >Login with email</Button>

                </Input.Group>
            </div>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    return { props: { headers } }
}