import {useQuery} from 'react-query'
import { axiosPost2, faqAxiosPost } from './ajaxHook'
import { useGlobalList } from '../globalFunctions/store'

export const useFetchCarouselImage = () => {
    return useQuery({
        queryKey: ['carousel'],
        staleTime: 1000,
        enabled: true,
        queryFn: async () => (axiosPost2('/banner.do')),
        onSuccess:(data)=>{
            useGlobalList.setState({swiperData:data})
        }
    })
}