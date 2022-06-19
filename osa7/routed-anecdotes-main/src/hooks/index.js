import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
        console.log('event.target.value: ', event.target.value)
    }
    console.log('type: ', type)

    const reset = (event) => {
        setValue('')
    }

    return {
        inputs: {
            type,
            value,
            onChange
        },
        reset
    }
}
