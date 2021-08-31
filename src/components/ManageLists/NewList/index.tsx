import { useState } from 'react'
import { InputHTMLAttributes } from 'react'
import { CreateList } from '../CreateList'
import './index.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fromChildParentCallback: CallableFunction;
}

export function NewList(props: InputProps) {
    let [createListIsOpen, setCreateListIsOpen] = useState(false)
    let [textCreateCancel, setTextCreateCancel] = useState('Nova Lista')

    const handleChangeTextNewList = (text: string) => {
        props.fromChildParentCallback(text)
    }

    const createList = () => {
        if (createListIsOpen) {
            return <CreateList TextfromChildParentCallback={handleChangeTextNewList}/>
        }
    }

    const handleChangeCreateList = () => {
        if (!createListIsOpen) {
            setCreateListIsOpen(true)
            setTextCreateCancel('Cancelar')
        } else {
            setCreateListIsOpen(false)
            setTextCreateCancel('Nova Lista')
        }
    }

    return (
        <>
            <div className="newlist">
                <div className="btn-list" onClick={() => handleChangeCreateList()}>
                    <p>{textCreateCancel}</p>
                </div>
                {createList()}
            </div >
        </>
    )
}