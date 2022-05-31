import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react'
import { authContext } from '../contexts/authWrapper';
import { db } from '../firebase/firebase';
import Page from '../layouts/Page'

function Answer({ id }) {

    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState('');
    const [questionAskedBy, setQuestionAskedBy] = useState('');

    useEffect(() => {

        const initSetup = async () => {

            const docSnap = await getDoc(doc(db, `questions/${id}`));

            console.log(docSnap.data());
            // retrieving the user who asked the question
            const userAsked = docSnap.data().userAsked;
            const userDetails = await getDoc(doc(db, `users/${userAsked}`));

            //retrieving the users who answered the question having questionId as id
            const answerArray = docSnap.data().answers;

            let promisedAnswerArray = answerArray.map(async element => {
                //extracting answer
                let ans = element.answer;

                // extracting user answer date from timestamp
                const date = new Date(element.timestamp);
                date = date.toDateString();

                //extracting user
                let userdoc = (await getDoc(doc(db, `users/${element.userAnswered}`))).data();
                let name = userdoc.name;
                let photoURL = userdoc.photoURL;

                return { name, photoURL, date, ans};
            });

            const resolved = await Promise.all(promisedAnswerArray);
            console.log(resolved);

            setQuestionAskedBy(userDetails.data().name);
            setAnswers(resolved);
            setQuestion(docSnap.data().question);
        }

        initSetup();

    }, [])

    return (
        <Page
            title='Answers'
            content='answer according to id passed as parameter'>
            <div className='font-bold px-2 py-5 text-3xl'>
                {question}
                <div className='font-thin text-lg '>Asked by {questionAskedBy}</div>
            </div>
            {
                answers.map(({ ans, photoURL, date, name }) => (
                    <div className=' text-left text-lg p-2 mb-5 bg-white'>
                        <div className='flex gap-2 mb-3'>
                            <img className="w-10 h-10 rounded-full" src={photoURL} alt="icon" />
                            <div className='text-zinc-400 text-sm'>
                                <div className='truncate'>{name}</div>
                                <div>{date}</div>
                            </div>
                        </div>
                        {ans}
                    </div>
                ))
            }
        </Page>
    )
}

export default Answer