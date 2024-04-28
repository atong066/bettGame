import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosPost, axiosGet } from "./ajaxHook";


export const useGetActivities = () => {
    return useQuery({
        queryKey: ["activeActivityEvents"],
        staleTime: 1000 * 60 * 2,
        enabled: false,
        queryFn: async () => (await axiosPost("/activityPage.do")),
    })
}