import { Input } from 'antd';
import React, { useState } from 'react';
import GoogleProvider from "next-auth/providers/google";
import { useAppDispatch } from '@app/store';
import { setToken } from './redux/actions';


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
            <div>Ahihi</div>
            <input />
            <button onClick={login}>Login</button>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    return { props: { headers } }
}