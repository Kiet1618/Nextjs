import { Input } from 'antd';
import React, { useState } from 'react';
import GoogleProvider from "next-auth/providers/google";
import { useAppDispatch } from '@app/store';
import { setToken } from './redux/actions';
import { Button } from 'antd';

export default function App() {
    const dispatch = useAppDispatch();
    const [idToken, setIdToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);


    const login = () => {
        setIdToken("1")
        dispatch(setToken(idToken));
        console.log('Successfully logged in ' + idToken);
    }

    return (
        <div>
            <div>Login Google</div>
            <Input.Group compact>
                <Input style={{ width: 200 }} />
                <Button type="primary" onClick={login}>Submit</Button>
            </Input.Group>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    return { props: { headers } }
}