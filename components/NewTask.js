import { useState } from "react"
import { db } from '../firebase'
import firebase from 'firebase';
import { useSession } from "next-auth/client";


function NewTask() {
    const [session] = useSession();
    const [input, setInput] = useState('')
    const [desc, setDesc] = useState('')
    

    const add = (e) => {
        e.preventDefault();
        if (input.length >= 1 && desc.length >= 2) {
            db.collection('users').doc(session.user.id).collection('todos').add({
                title: input,
                description: desc,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setInput('');
            setDesc('');
        } else {
            alert('Invalid data')
        }
    }
    return (
        <div className='flex space-y-4 my-9 flex-col items-center mx-auto justify-center p-10 border border-gray-300 shadow-lg rounded-md max-w-3xl'>
            <input className='w-full px-4 py-3 outline-none border border-gray-300 rounded-md shadow-sm focus:shadow-md' placeholder='Title...' value={input} onChange={(e) => setInput(e.target.value)} />
            <textarea className='w-full px-4 py-3 outline-none border border-gray-300 rounded-md shadow-sm focus:shadow-md' placeholder='Description...' value={desc} onChange={(e) => setDesc(e.target.value)} />
            <button className='w-full border rounded-md border-green-700 text-gray-700 text-xl px-4 py-2 font-semibold focus:scale-90 transition transform duration-75 ease-out' onClick={add} >Add</button>
        </div>
    )
}

export default NewTask
