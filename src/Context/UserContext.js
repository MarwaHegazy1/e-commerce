import { createContext ,useState} from "react";

export let UserContext=createContext()

export default function UserContextProvider(props){

    const [userToken, setUserToken]=useState(null)
    const [userData, setUserData]=useState(null)
    const [userEmail,setUserEmail]=useState(null)


    return <UserContext.Provider value={{userToken,setUserToken,setUserData,userData,setUserEmail,userEmail}}>
        {props.children}
    </UserContext.Provider>
}