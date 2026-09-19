
import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser]=useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if(token && savedUser){
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    },[]);

    async function login(email,password){
        const response = await axiosClient.post('/login', {email, password});
        const {token, user} =response.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setUser(user);
    }

    async function logout(){
        try{
            await axiosClient.post('/logout');
        }
        catch(error){
            console.error('Logout Error',error);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);      
}
 const value = {
            user,
            login,
            logout,
            isAuthenticated: !!user,
        };

        return(
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        )
    }

    export function useAuth(){
        return useContext(AuthContext);
    }