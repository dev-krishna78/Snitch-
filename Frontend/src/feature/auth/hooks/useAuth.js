import { setLoading,setError,setUser } from "../state/auth.slice";
import { register } from "../services/auth.service";
import {useDispatch} from "react-redux"


export const useAuth = ()=>{
const dispatch = useDispatch()

async function handleRegister({email, contact , password , isSeller = false , fullname }){
      const data = await register({email, contact , password , isSeller , fullname })

      dispatch(setUser(data.user))
}

// async function handleLogin({email , password}){
      
// }
return {handleRegister}
}
