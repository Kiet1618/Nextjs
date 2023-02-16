import { Input } from 'antd';
import React, { useState } from 'react';
import GoogleProvider from "next-auth/providers/google";
import { useAppDispatch } from '@app/store';
import { setToken } from './redux/actions';
import { Button } from 'antd';
import { signIn } from 'next-auth/react'

export default function App() {
    const dispatch = useAppDispatch();
    const [idToken, setIdToken] = useState('');
    const handleSubmit = async (event) => {
        setIdToken("1")
        dispatch(setToken("12213"));

        event.preventDefault();
        const result = await signIn("google", {
            callbackUrl: `${window.location.origin}/overview`,
            redirect: false,
        });

        if (result?.url) {
            window.location.href = result.url;
        } else {
            console.error("Failed to initiate Google sign-in flow");
        }

    };


    return (
        <div>
            <div>Login Google</div>
            <Input.Group compact>
                <Input style={{ width: 200 }} />
                <Button type="primary" onClick={handleSubmit}>Submit</Button>
            </Input.Group>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    return { props: { headers } }
}