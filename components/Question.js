import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useContext, useState } from 'react'
import { authContext } from '../contexts/authWrapper'
import { db } from '../firebase/firebase';
import Card from '../layouts/Card';
import Page from '../layouts/Page';

function Question({ id }) {

  // grabbing the user
  const { authUser } = useContext(authContext);

  //states regarding questions and answer by the user
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const initSetup = async () => {
      const questionDoc = await getDoc(doc(db, `questions/${id}`));
      const ques = questionDoc.data().question;

      const userDocRef = await getDoc(doc(db, `users/${authUser.uid}`));
      const { answersGiven } = userDocRef.data();
      //  console.log(answersGiven, userDocRef.data());

      let ans = '';
      answersGiven.forEach((val) => {
        const { questionId } = val;
        if (questionId == id) {
          ans = val.answer;
        }
      });

      setQuestion(ques);
      setAnswer(ans);

    }

    initSetup();

  }, [])

  return (
    <Page title='Question' content='page displaying the answers whose question is '>
      <Card classitems='bg-white'>
        <h3 className='p-2 m-2 text-center font-bold'>{question}</h3>
        <p className='text-left m-2 p-2'>{answer}</p>
      </Card>
    </Page>
  )
}

export default Question