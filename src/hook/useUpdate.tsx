import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { instance } from "../model/axios";
import { Stories } from "../types/product";


const useUpdateStory = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: async (update: Stories) => {
            const res = await instance.put(`/stories/${update.id}`, update)
            return res
        },
        onSuccess: () => {
            toast.success("sua thanh cong")
            query.invalidateQueries({ queryKey: ["stories"] })
        },
        onError: (err) => {
            console.log(err);
            toast.error("sua loi")
        }
    })

}
export default useUpdateStory