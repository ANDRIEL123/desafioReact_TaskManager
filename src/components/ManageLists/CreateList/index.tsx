import { Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import { InputHTMLAttributes } from 'react'
import './index.scss'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    TextfromChildParentCallback: CallableFunction;
}

export function CreateList(props: InputProps) {
    let [text, setText] = useState('')

    const submitText = () => {
        props.TextfromChildParentCallback(text)
        setText('')
    }

    return (
        <div className="input-list">
            <TextField
                type="text"
                variant="filled"
                placeholder="Título da lista"
                value={text}
                onChange={e => setText(e.target.value)}
                required
            />
            <Button
                variant="contained"
                color="primary"
                onClick={submitText}
            >
                Criar
            </Button>
        </div>
    )
}