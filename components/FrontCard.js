import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase';
import Card from '../layouts/Card';
import {useRouter} from 'next/router';

function FrontCard({ questionId, stringValue, setAnswerModal, setquestionID }) {

    const imageUrl = 'https://source.unsplash.com/1600x900/?beach';

    // grabbing router
    const router = useRouter();

    // state for name, date, answer
    const [name, setName] = useState('');
    const [date, setDate] = useState('loading');
    const [answer, setAnswer] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(imageUrl);



    // handle answer button click
    const handleAnswerBtn = (questionId) => {
        setAnswerModal(true);
        setquestionID(questionId);
    }

    // function to get User answered and timestamp when he answered the question
    const getUserWithTimeStamp = async (questionId) => {
        const document = await getDoc(doc(db, `questions/${questionId}`));
        const answerEle = document.data().answers[0] || {};
        // console.log(answerEle);
        const { answer = 'no answer', timestamp = 'invalid date', userAnswered = '' } = answerEle;
        let name = 'no name';
        if (userAnswered != '') {
            let userdoc = (await getDoc(doc(db, `users/${userAnswered}`))).data();
            name = userdoc.name;
            setProfilePhoto(userdoc.photoURL);
        }
        
        // extracting user answer date from timestamp
        const date = new Date(timestamp);
        date = date.toDateString();
        // console.log(answer, name, date);

        setAnswer(answer);
        setName(name);
        setDate(date);
    }

    useEffect(() => {
        getUserWithTimeStamp(questionId);

    }, [])


    return (
        <Card classitems='h-1/2 bg-white p-2 mb-2'>
            <div className='p-2 flex gap-2 h-1/5 justify-between'>
                <div className='flex gap-2'>
                    <img className="w-10 h-10 rounded-full" src={profilePhoto} alt="icon" />
                    <div className='text-zinc-400 text-sm'>
                        <div className='truncate'>{name}</div>
                        <div>{date}</div>
                    </div>
                </div>
                <button className='mx-2 p-2 border-2 border-indigo-600 rounded-full' onClick = {() => router.push(`/answer?id=${questionId}`)}>View more</button>
            </div>
            <div className='group h-4/5 flex flex-col justify-center items-center relative'>
                <div className='question m-2 h-1/5 font-bold group-hover:opacity-50'>{stringValue}</div>
                <div className='answer m-2 h-3/5 overflow-hidden group-hover:opacity-50 text-left'>
                    {answer}
                </div>
                <button
                    className='bg-indigo-600 rounded-xl text-sm p-2 font-medium text-white hidden group-hover:block absolute m-auto shadow-xl'
                    onClick={() => handleAnswerBtn(questionId)}>
                    Your Opinion
                </button>
            </div>
        </Card>
    )
}

export default FrontCard