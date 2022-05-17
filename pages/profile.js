import React, { useEffect, useState, useContext } from 'react'
import Page from '../layouts/Page'
import Card from '../layouts/Card';
import { authContext } from '../contexts/authWrapper';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

function profile() {

  // grabbing user 
  const { authUser } = useContext(authContext);

  //states for Profile Image and question and answer
  const [profileImage, setprofileImage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [memberData, setMemberData] = useState('loading...');

  useEffect(() => {
    const initSetup = async () => {
      const docSnap = await getDoc(doc(db, `users/${authUser.uid}`));

      const allQuestionPromises = docSnap.data().questionsAsked.map(async (val) => {
        const snap = await getDoc(doc(db, `questions/${val}`));
        return snap.data().question;
      });

      const questionPromiseResolved = await Promise.all(allQuestionPromises);
      console.log(questionPromiseResolved);

      // resolving the account creation time
      const timestamp = parseInt(authUser.metadata.createdAt);
      const d = new Date(timestamp);

      setprofileImage(docSnap.data().photoURL);
      setQuestions(questionPromiseResolved);
      setMemberData(d.toDateString());
    }

    initSetup();

  }, []);

  const answers = [
    'to give is the meaning of the your name(donate)',
    'focus on health, goal, networking',
    'i dunnknow',
    'i feel the same hahaha!!!'
  ]

  return (
    <Page bgColor='bg-slate-100' title='Profile' content='Profile Page of User'>
      <Card classitems='flex justify-center flex-col mb-2 bg-white items-center'>
        <img className='bg-red-700 w-44 h-44 rounded-full' src={profileImage}></img>
        <div className='text-3xl font-bold'>Name</div>
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
                <span className='truncate w-full group-hover:hidden'>{question}</span>
                <button className=' group-hover:block bg-indigo-600 hidden font-semibold text-white text-sm p-2 rounded-md m-auto'>View Answers</button>
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
                <span className='group-hover:hidden truncate w-full'>{answer}</span>
                <button className='group-hover:block bg-indigo-600 hidden text-white font-semibold text-sm p-2 rounded-md m-auto'>View Question</button>
              </div>
            ))
          }
        </Card>
      </Card>
    </Page>
  )
}

export default profile