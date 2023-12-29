'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

type TanstackProviderProps={
    children:ReactNode
}

export default function TanstackProvider({children}:TanstackProviderProps){
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient} >{
        children
        }
            <ReactQueryDevtools  initialIsOpen={false}/>
        </QueryClientProvider>
    )
}