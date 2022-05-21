import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react'
import { authContext } from '../contexts/authWrapper';
import { db } from '../firebase/firebase';
import Page from '../layouts/Page'

function Answer({ id }) {

    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState('');

    useEffect(() => {

        const initSetup = async () => {

            const docSnap = await getDoc(doc(db, `questions/${id}`));

            console.log(docSnap.data());

            setAnswers(docSnap.data().answers);
            setQuestion(docSnap.data().question);
        }

        initSetup();

    }, [])

    return (
        <Page
            title='Answers'
            content='answer according to id passed as parameter'>
            <div className='font-bold text-center px-2 py-5 text-3xl'>{question}</div>
            {
                answers.map(({ answer }) => (
                    <div className=' text-left text-lg p-2 mb-5 bg-white'>{answer}</div>
                ))
            }
        </Page>
    )
}

export default Answer