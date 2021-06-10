import React ,{ createContext, useState} from 'react'

export const LoginContext = createContext();

export const LoginProvider = (props)=> {
    const [login,setLogin] = useState(false);
    return (
        <LoginContext.Provider value={[login,setLogin]}>
            {props.children}
        </LoginContext.Provider>
    );
}


