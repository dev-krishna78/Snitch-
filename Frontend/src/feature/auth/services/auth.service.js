import axios from "axios"

const authapiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function register({email, contact, fullname , isSeller , password}){

    const response = await authapiInstance.post("/register",{
        email,
        password,
        fullname,
        isSeller,
        contact
    })

    return response.data 
}