import { useQueries, useQuery } from "@tanstack/react-query"
import { instance } from "../model/axios"
 
const useList = () =>{
    return useQuery({
        queryKey: ["stories"],
        queryFn: async() =>{
            const res = await instance.get("/stories")
            return res.data
        }
    })
}
export default useList