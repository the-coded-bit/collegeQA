import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';


export const authContext = createContext({ authUser: null, loading: true });

function AuthWrapper({ children }) {

    //user and fetching user from firebase i.e. loading status states
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //default use Effect
    useEffect(() => {
        console.log('use effect of authwrapper');
        onAuthStateChanged(auth, async (user) => {
            console.log('on auth state changed triggered');
            if (!user) {
                console.log('user not found');
                setAuthUser(null);
                setLoading(false);
            }
            else {
                setLoading(true);
                console.log('printing user from use effect of authwrapper =', user);
                setAuthUser(user);
                setLoading(false);
            }
        });
    }, []);


    //authOptions

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }


    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }


    function logout() {
        return signOut(auth);
    }


    //creating authOptions with functionalities of signin, signout, login
    const authOptions = {
        signup,
        login,
        logout,
        setAuthUser,
        authUser,
        loading,
        setLoading
    }

    console.log('render of authWrapper');
    return (
        <authContext.Provider value={authOptions}>
            {!loading && children}
        </authContext.Provider>
    )
}

export default AuthWrapper