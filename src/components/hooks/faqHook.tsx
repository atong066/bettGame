import { useQuery, useMutation, useQueryClient } from 'react-query'
import { faqAxiosPost } from './ajaxHook'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useFaqActivities = () => {
    return useQuery({
        queryKey: ['faqData'],
        staleTime: 1000 * 60,
        enabled: false,
        queryFn: async () => (faqAxiosPost('/helpJson.do'))
    })
}

type faqData = {
    faqs: any,
}
export const useFaqs = create<faqData>()(
    devtools(
        persist((set) => ({
            faqs: {},
        }), {
            name: "faqs"
        })
    )
)

