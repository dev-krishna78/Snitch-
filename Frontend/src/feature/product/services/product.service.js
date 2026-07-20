import axios from "axios"

const productApiInstance = axios.create({
    baseURL: "/api/product",
    withCredentials: true
})


export async function createProduct(formData){
   const response = await productApiInstance.post("/",formData)

   return response.data 
}


export async function getSellerProduct(){
    try {
        const response = await productApiInstance.get("/")
        return response.data
    } catch (error) {
        console.error("Failed to load products:", error)
        throw new Error(
            error?.response?.data?.message || "Unable to fetch products. Please try again."
        )
    }
}


export async function getAllProducts(){
   const response = await productApiInstance.get("/")

   return response.data 
}