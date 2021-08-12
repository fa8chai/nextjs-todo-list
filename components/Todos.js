import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { db } from '../firebase';
import { PencilAltIcon } from '@heroicons/react/solid';
import {ClipboardListIcon} from '@heroicons/react/outline';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import Button from "@material-tailwind/react/Button";
import { useState } from 'react';
import { useSession } from "next-auth/client";


function Todos() {
    const [session] = useSession();

    const [snapshot] = useCollection(db.collection('users').doc(session.user.id).collection('todos').orderBy('timestamp', 'desc'));
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [todo, setTodo] = useState({});


    function createData(id, title, description, date) {
        return { id, title, description, date };
    }

    const rows = [
        snapshot?.docs?.map(doc => (
            createData(doc.id, doc.data().title, doc.data().description, doc.data().timestamp)
        ))
    ];
    const clearData = () => {
        setTodo({});
        setTitle('');
        setDesc('');
        setShowModal(false);
    }

    const handleClick = (todo) => {
        setTodo(todo);
        setTitle(todo.title);
        setDesc(todo.description);
        setShowModal(true);
    }
    const deleteTodo = (todo) => {
        db.collection('users').doc(session.user.id).collection('todos').doc(todo.id).delete();
        clearData()
    }
    const editTodo = (todo) => {
        if(!title || !desc) {
            alert('Invalid data!');
            return
        } else {
            db.collection('users').doc(session.user.id).collection('todos').doc(todo.id).set({
                title: title,
                description: desc,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            clearData();
        }
    }
    const modal = (
        <Modal size='lg' active={showModal} toggler={() => setShowModal(false)}>
            <ModalBody>
                <p>Title</p>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type='text'
                    className='outline-none w-full px-3 py-2 border border-gray-300 mb-4 rounded-lg'
                    placeholder='Enter title of todo...'
                />
                <p>Description</p>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className='outline-none w-full px-3 py-2 border border-gray-300 rounded-lg'
                    placeholder='Description...'
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    color='red'
                    buttonType='link'
                    onClick={() => deleteTodo(todo)}
                    ripple='dark'
                >
                    Delete
                </Button>

                <Button color='green'  ripple='light' onClick={() => editTodo(todo)}>
                    Edit
                </Button>
            </ModalFooter>
        </Modal>
    )
    return (
        <section className='bg-white px-10 md:px-0'>
            <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
                {modal}
            <TableContainer component={Paper}>
                    <Table size='medium' aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell><p className='text-gray-700 font-semibold text-md'>To Do's</p></TableCell>
                            <TableCell align="center"><p className='text-gray-700 font-semibold text-md'>Description</p></TableCell>
                            <TableCell align="right"><p className='text-gray-700 font-semibold text-md'>Date</p></TableCell>
                            <TableCell align="right"><ClipboardListIcon className='h-5 w-5 text-gray-500' /></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows[0]?.length <=0 ? <div className='m-5 w-full'>
                                <p className='text-gray-700'>Add Some Tasks!</p>
                            </div>
                            :
                            rows[0]?.map((row) => (
                                <TableRow className='rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer' key={row.id}>
                                <TableCell component="th" scope="row">
                                        <p className='text-gray-700 font-semibold'>{row?.title}</p>
                                </TableCell>
                                <TableCell align='left'>
                                        <p className='text-gray-700'>{row?.description}</p>
                                </TableCell>
                                <TableCell align="right"><p className='text-gray-700 text-sm'>{row?.date?.toDate().toLocaleDateString()}</p></TableCell>
                                    <TableCell align="right">
                                        <PencilAltIcon onClick={() => handleClick(row)}  className='h-5 w-5 text-gray-500 hover:text-gray-800 hover:scale-110 transition duration-75 ease-out' />
                                </TableCell>
                                </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            
        </section>
    )
}

export default Todos