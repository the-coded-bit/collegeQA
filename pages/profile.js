import React, { useEffect, useState, useContext } from 'react'
import Page from '../layouts/Page'
import Card from '../layouts/Card';
import { authContext } from '../contexts/authWrapper';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useRouter } from 'next/router';

function profile() {

  //grabbing router
  const router = useRouter();


  // grabbing user 
  const { authUser } = useContext(authContext);

  //states for Profile Image and question and answer
  const [profileImage, setprofileImage] = useState('');
  const [name, setName] = useState('Name');
  const [questions, setQuestions] = useState([]);
  const [memberData, setMemberData] = useState('loading...');
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const initSetup = async () => {

      //resolving questions asked by user
      const docSnap = await getDoc(doc(db, `users/${authUser.uid}`));

      const allQuestionPromises = docSnap.data()?.questionsAsked.map(async (val) => {
        const snap = await getDoc(doc(db, `questions/${val}`));
        return snap.data();
      });

      const questionPromiseResolved = await Promise.all(allQuestionPromises);
      console.log(questionPromiseResolved);

      // resolving the account creation time
      const timestamp = parseInt(authUser.metadata.createdAt);
      const d = new Date(timestamp);

      // TODO : resolve the question whose answers given by user
      const allAnswers = docSnap.data().answersGiven.map((val) => {
        const { answer = '', questionId = '' } = val || {};
        return { answer, questionId };
      })

      setprofileImage(docSnap.data().photoURL);
      setQuestions(questionPromiseResolved);
      setName(docSnap.data().name);
      setMemberData(d.toDateString());
      console.log(allAnswers);
      setAnswers(allAnswers);
    }

    initSetup();

  }, []);

  return (
    <Page bgColor='bg-slate-100' title='Profile' content='Profile Page of User'>
      <Card classitems='flex justify-center flex-col mb-2 bg-white items-center'>
        <img className='bg-red-700 w-44 h-44 rounded-full' src={profileImage}></img>
        <div className='text-3xl font-bold'>{name}</div>
        <Card classitems='bg-slate-100 m-4 p-2 w-11/12 shadow-md'>
          <div className='flex justify-between items-center mb-2 border-b-2 border-slate-400 pb-2'>
            <span>Status</span>
            <button className='bg-green-500 text-white text-sm p-2 rounded-md w-24'>Active</button>
          </div>
          <div className='flex justify-between items-center '>
            <span>Member Since</span>
            <span className='w-26'>{memberData}</span>
          </div>
        </Card>
      </Card>

      <Card classitems='flex justify-center flex-col mb-2 bg-white items-center'>
        <div className='font-bold text-3xl'>Questions Asked</div>
        <Card classitems='bg-slate-100 m-4 p-2 w-11/12 shadow-md'>
          {
            questions.map((question) => (
              <div className='group flex justify-between items-center mb-2 border-b-2 border-slate-400 pb-2'>
                <span className='truncate w-full group-hover:hidden'>{question?.question}</span>
                <button
                  className=' group-hover:block bg-indigo-600 hidden font-semibold text-white text-sm p-2 rounded-md m-auto'
                  onClick={() => router.push(`/answer?id=${question.questionId}`)}>
                  View Answers
                </button>
              </div>
            ))
          }
        </Card>
      </Card>
      <Card classitems='flex justify-center flex-col mb-2 bg-white items-center'>
        <div className='font-bold text-3xl'>Answered</div>
        <Card classitems='bg-slate-100 m-4 p-2 w-11/12 shadow-md'>
          {
            answers.map((answer) => (
              <div className='group flex justify-between items-center mb-2 border-b-2 border-slate-400 pb-2'>
                <span className='group-hover:hidden truncate w-full'>{answer.answer}</span>
                <button
                  className='group-hover:block bg-indigo-600 hidden text-white font-semibold text-sm p-2 rounded-md m-auto'
                  onClick={() => router.push(`/question?id=${answer.questionId}`)}>
                  View Question
                </button>
              </div>
            ))
          }
        </Card>
      </Card>
    </Page>
  )
}

export default profile