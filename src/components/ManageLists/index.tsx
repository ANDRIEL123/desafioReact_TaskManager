import { useState } from 'react'
import React from 'react';
import { ClassList } from '../../entities/List'
import './index.scss'
import { NewList } from './NewList'
import Modal from 'react-modal'
import { Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core'
import { CalendarToday, DataUsage, Edit, Info, More, MoreHoriz, MoreHorizOutlined, Send, Title } from '@material-ui/icons'
import { currentDate } from './CurrentDate'
import LinearWithValueLabel from '../LinearWithValueLabel'
import Menu from '@material-ui/core/Menu';
import { orderDate, orderPriority } from '../../uteis/ordenacao';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        padding: '3em',
        borderRadius: '1em',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export function ManageLists() {
    //Listas
    let [titleList, setTitleList] = useState('Default')
    let [arrLists, setArrLists] = useState<ClassList[]>([])

    //Modals
    let [modalIsOpenInsertCard, setModalIsOpenInsertCard] = useState(false)
    let [modalIsOpenEditCard, setModalIsOpenEditCard] = useState(false)
    let [modalIsOpenInfosCard, setModalIsOpenInfosCard] = useState(false)

    //Informações de um novo Card
    let [titleCard, setTitleCard] = useState('Default')
    let [descriptionCard, setDescriptionCard] = useState('Default')
    let [prazoCard, setPrazoCard] = useState(new Date(currentDate()))
    let [prioridade, setPrioridade] = useState(1)

    //Index atual LISTA de Cards
    let [currentIndexList, setCurrentIndexList] = useState(0)
    //Index atual Card
    let [currentIndexCard, setCurrentIndexCard] = useState(0)
    //Title atual da lista
    let [currentTitleList, setCurrentTitleList] = useState('')

    //Anchor menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, indexList: number, title: string) => {
        setAnchorEl(event.currentTarget);
        setCurrentIndexList(indexList)
        setCurrentTitleList(title)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const checkRepeat = (text: string) => {
        let aux: string = ''
        arrLists.map(value => {
            if (value.title === text) {
                aux = 'have'
            }
        })
        if (aux === 'have') {
            alert('Proibido nome de listas repetidos.')
            return true
        } else {
            return false
        }
    }

    const handleChangeTextNewList = (text: string) => {
        let haveRepeat: boolean = checkRepeat(text)

        if (haveRepeat === false && text !== '') {
            setTitleList(text)
            arrLists.push(new ClassList(text))
            setArrLists(arrLists)
        }
    }

    const removeListArray = (title: string) => {
        return arrLists.filter(item => item.title != title)
    }

    const editListArray = () => {
        arrLists[currentIndexList].listCards[currentIndexCard].titleCard = titleCard
        arrLists[currentIndexList].listCards[currentIndexCard].descriptionCard = descriptionCard
        arrLists[currentIndexList].listCards[currentIndexCard].prazo = prazoCard
        arrLists[currentIndexList].listCards[currentIndexCard].prioridade = prioridade
    }

    const modalOpenInsertCard = () => {
        if (modalIsOpenInsertCard) {
            setModalIsOpenInsertCard(false)
        } else {
            setModalIsOpenInsertCard(true)
        }
    }

    const modalOpenEditCard = () => {
        if (modalIsOpenEditCard) {
            setModalIsOpenEditCard(false)
        } else {
            setModalIsOpenEditCard(true)
        }
    }

    const modalOpenInfoCard = () => {
        if (modalIsOpenInfosCard) {
            setModalIsOpenInfosCard(false)
        } else {
            setModalIsOpenInfosCard(true)
        }
    }

    const addCard = () => {
        arrLists[currentIndexList].addCard(titleCard, descriptionCard, prazoCard, prioridade)
        setCurrentIndexCard(arrLists[currentIndexList].listCards.length - 1)
    }

    const removeCard = () => {
        arrLists[currentIndexList].listCards.splice(currentIndexCard, 1)
        modalOpenInfoCard()
    }

    const formataMonth = (month: number) => {
        if (month < 10) {
            return `0${month}`
        } else {
            return month
        }
    }

    const retornaPrioridade = (prioridade: number) => {
        if (prioridade === 1) {
            return 'Baixa'
        } else if (prioridade === 2) {
            return 'Média'
        } else {
            return 'Alta'
        }
    }

    const formatDate = (date: Date) => {
        var day = String(date.getDate()).padStart(2, '0');
        var month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let year = date.getFullYear()
        return `${year}-${month}-${day}`
    }

    {/*Modal com as informações sobre o CARD */ }
    const renderModalInfoCards = () => {
        if (modalIsOpenInfosCard) {

            return (
                <Modal
                    isOpen={modalIsOpenInfosCard}
                    style={customStyles}
                >
                    <div className="modal-info">
                        <h2><Info />Informações do Card</h2><br /><br />
                        <p>Título</p>
                        <label>{arrLists[currentIndexList].listCards[currentIndexCard].titleCard}</label> <br /><br />
                        <p>Descrição</p>
                        <label>{arrLists[currentIndexList].listCards[currentIndexCard].descriptionCard}</label> <br /><br />
                        <p>Prazo</p>
                        <label><CalendarToday /><label>{String(arrLists[currentIndexList].listCards[currentIndexCard].prazo.getDate() + 1)}/
                            {String(formataMonth(arrLists[currentIndexList].listCards[currentIndexCard].prazo.getMonth() + 1))}/
                            {String(arrLists[currentIndexList].listCards[currentIndexCard].prazo.getFullYear())}</label></label> <br /><br />
                        <p>Prioridade</p>
                        <label>{retornaPrioridade(arrLists[currentIndexList].listCards[currentIndexCard].prioridade)}</label> <br /><br />
                        <br /><br />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                modalOpenInfoCard()
                                modalOpenEditCard()
                                setTitleCard(arrLists[currentIndexList].listCards[currentIndexCard].titleCard)
                                setDescriptionCard(arrLists[currentIndexList].listCards[currentIndexCard].descriptionCard)
                                setPrazoCard(arrLists[currentIndexList].listCards[currentIndexCard].prazo)
                                setPrioridade(arrLists[currentIndexList].listCards[currentIndexCard].prioridade)
                            }}>Editar
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            variant="contained"
                            color="secondary"

                            onClick={() => removeCard()}>Remover
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            variant="contained"
                            onClick={() => modalOpenInfoCard()}>Cancelar
                        </Button>
                    </div>
                </Modal >

            )
        }
    }

    const renderModalInsertCard = () => {
        {/*Modal de inserção de um novo CARD */ }
        return (

            < Modal
                isOpen={modalIsOpenInsertCard}
                style={customStyles}
            >
                <h2>Criar Card</h2>
                <TextField variant="filled" type="text" style={{ width: "30em" }} placeholder="Título" onChange={e => setTitleCard(e.target.value)} /><br /><br />
                <TextField variant="filled" type="text" style={{ width: "30em" }} placeholder="Descrição" onChange={e => setDescriptionCard(e.target.value)} /><br /><br />
                <TextField defaultValue={currentDate()} type="date" label="Prazo" onChange={e => setPrazoCard(new Date(e.target.value))} /><br /><br />
                <InputLabel>Prioridade</InputLabel><br />
                <Select
                    label="Prioridade"
                    placeholder="prioridade"
                    value={prioridade}
                    onChange={e => setPrioridade(Number(e.target.value))}
                >
                    <MenuItem value={1} selected>Baixa</MenuItem>
                    <MenuItem value={2}>Media</MenuItem>
                    <MenuItem value={3}>Alta</MenuItem>
                </Select>
                <br /><br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        addCard()
                        modalOpenInsertCard()
                    }}>Inserir</Button>
                {' '}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        modalOpenInsertCard()
                    }}>Cancelar</Button>
            </Modal >
        )
    }

    const renderModalEditCard = () => {
        {/*Modal de inserção de um novo CARD */ }

        if (modalIsOpenEditCard) {
            return (
                < Modal
                    isOpen={modalIsOpenEditCard}
                    style={customStyles}
                >
                    <h2>Editar Card</h2>
                    <TextField variant="filled" type="text" value={titleCard} style={{ width: "30em" }} placeholder="Título" onChange={e => setTitleCard(e.target.value)} /><br /><br />
                    <TextField variant="filled" type="text" value={descriptionCard} style={{ width: "30em" }} placeholder="Descrição" onChange={e => setDescriptionCard(e.target.value)} /><br /><br />
                    <TextField defaultValue={currentDate()} value={formatDate(prazoCard)} type="date" label="Prazo" onChange={e => setPrazoCard(new Date(e.target.value))} /><br /><br />
                    <InputLabel>Prioridade</InputLabel><br />
                    <Select
                        label="Prioridade"
                        placeholder="prioridade"
                        value={prioridade}
                        onChange={e => setPrioridade(Number(e.target.value))}
                    >
                        <MenuItem value={1} selected>Baixa</MenuItem>
                        <MenuItem value={2}>Media</MenuItem>
                        <MenuItem value={3}>Alta</MenuItem>
                    </Select>
                    <br /><br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            editListArray()
                            setPrazoCard(new Date(currentDate()))
                            modalOpenEditCard()
                        }}>Editar</Button>
                    {' '}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            modalOpenEditCard()
                        }}>Cancelar</Button>
                </Modal >
            )
        }
    }

    return (

        <div className="manage-lists">
            {arrLists.map((value, indexList) => {
                { console.log(arrLists) }
                return (
                    <div className="separa">
                        {renderModalInsertCard()}
                        {renderModalInfoCards()}
                        {renderModalEditCard()}

                        <div className="list">
                            <div className="header-list">
                                <input type="text" value={value.title} />
                                <div className="menu">
                                    <div>
                                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={e => handleClick(e, indexList, value.title)}>
                                            <MoreHorizOutlined />
                                        </Button>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={() => {
                                                let confirm = window.confirm('Deseja realmente excluir a lista?');
                                                if (confirm) {
                                                    setArrLists(removeListArray(currentTitleList))
                                                    handleClose()
                                                }
                                            }}>
                                                Remover
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                orderDate(arrLists[currentIndexList])
                                                handleClose()
                                            }}>Ordenar cards por prazo</MenuItem>
                                            <MenuItem onClick={() => {
                                                orderPriority(arrLists[currentIndexList])
                                                handleClose()
                                            }}>Ordenar cards por prioridade</MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                            {value.listCards.map((card, indexCard) => {
                                if (value.listCards[indexCard].titleCard !== 'default') {
                                    return (
                                        <div className="card" onClick={() => {
                                            setCurrentIndexList(indexList)
                                            setCurrentIndexCard(indexCard)
                                            modalOpenInfoCard()
                                        }}>
                                            <label className="title">

                                                <label>
                                                    <Info />&nbsp;&nbsp;&nbsp;{value.listCards[indexCard].titleCard}
                                                </label>

                                                <Edit />
                                            </label>
                                            <br />
                                            <label className="date"><CalendarToday />
                                                {<label>
                                                    {String(value.listCards[indexCard].prazo.getDate() + 1)}/
                                                    {String(formataMonth(value.listCards[indexCard].prazo.getMonth() + 1))}/
                                                    {String(value.listCards[indexCard].prazo.getFullYear())}
                                                </label>}
                                            </label>
                                            <label className="linear">
                                                <LinearWithValueLabel />
                                            </label>

                                        </div>
                                    )
                                }

                            })}

                            <div className="footer-list">
                                <p onClick={() => {
                                    setCurrentIndexList(indexList)
                                    modalOpenInsertCard()
                                }}><label>Inserir Card</label><Send /> </p>
                            </div>
                        </div>
                    </div>
                )
            })}
            <NewList fromChildParentCallback={handleChangeTextNewList} />
        </div>
    )
}