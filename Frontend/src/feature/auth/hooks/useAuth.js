import { setLoading,setError,setUser } from "../state/auth.slice";
import { register , login} from "../services/auth.service";
import {useDispatch} from "react-redux"


export const useAuth = ()=>{
const dispatch = useDispatch()

async function handleRegister({email, contact , password , isSeller = false , fullname }){
      const data = await register({email, contact , password , isSeller , fullname })

      dispatch(setUser(data.user))
      console.log(data.user)
}

// async function handleLogin({email , password}){

async function handleLogin({email, password}){
      const data  = await login({email , password})

      dispatch(setUser(data.user))

      console.log(data.user)
}
      
// }
return {handleRegister, handleLogin}
}
