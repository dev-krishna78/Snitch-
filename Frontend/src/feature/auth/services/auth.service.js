import axios from "axios"

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function register({email, contact, password, fullname, isSeller}){
// const {email , contact , password , fullname, isSeller} = req.body;
    const response = await authApiInstance.post("/register",{
        email,
        contact,
        password,
        fullname,
        isSeller
    })

    return response.data 
}

export async  function login({email , password}){
       const responce = await authApiInstance.post("/login",{
        email, 
        password
       })

       return responce.data
}