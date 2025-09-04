import { useEffect, useState } from "react"

export const useDebounce=(search,delay=500)=>{
    const [debouncedValue,setDebouncedValue]=useState("");

    useEffect(()=>{
        const timeOut=setTimeout(()=>{
            setDebouncedValue(search)
        },delay)

        return ()=>clearTimeout(timeOut)
    },[search,delay])

    return debouncedValue
}