import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
        console.log('event.target.value: ', event.target.value)
    }
    console.log('type: ', type)

    return {
        type,
        value,
        onChange
    }
}
