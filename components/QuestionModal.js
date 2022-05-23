import { async } from '@firebase/util';
import { arrayUnion, collection, doc, query, setDoc, updateDoc, where, getDocs } from 'firebase/firestore';
import React, { useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { authContext } from '../contexts/authWrapper';
import { db } from '../firebase/firebase';


function QuestionModal({ modalStatus }) {

  //importing user
  const { authUser } = useContext(authContext);

  //maintain states for question input
  const [question, setQuestion] = useState('');

  const handleSubmit = async () => {

    if (question === '') return;
    // TODO : check if the question is already asked by someone 
    // then prompt the user saying he/she should search the question rather than asking
    toast('processing....');
    if (await alreadyPresent(question)) {
      toast('This Question is Already Asked, instead try to search for Answer', { duration: 4000 });
      return;
    }
    // TODO : store the question in db using the question schema
    //steps 
    // 1. create the unique question Id which acts as foreign key to other tables and primary key to Question schema
    const questionId = uuidv4();
    //2. create question store i.e. question object to store in db
    const questionStore = {
      questionId: questionId,
      question: question,
      userAsked: authUser.uid,
      answers: []
    }

    // 3. create doc reference in firebase doc
    const questionDocRef = doc(db, 'questions', questionId);

    //4. set doc to store question store
    toast.promise(
      setDoc(questionDocRef, questionStore),
      {
        loading: 'Saving....',
        success: <b>Question Saved!!</b>,
        error: <b>Could not save.</b>
      }
    )


    // TODO : push questionId in users Schema
    //steps
    // 1. get user doc reference
    const userDocRef = doc(db, `users/${authUser.uid}`);

    //2. update, add question id to questionsAsked in user store
    await updateDoc(userDocRef, {
      questionsAsked: arrayUnion(questionId)
    });
    console.log('details placed successfully');
  }

  //function to check if question is already present or not
  const alreadyPresent = async (question) => {
    const q = query(collection(db, 'questions'), where('question', '==', question));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    return (querySnapshot.size > 0);
  }


  return (
    <div className='w-screen h-screen bg-slate-100 flex'>
      <Toaster position='top-right'/>
      <div className=' m-auto w-4/5 h-4/6 bg-white shadow-xl relative'>
        <div className='h-12'>
          <button
            type="button"
            onClick={() => modalStatus(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-2 top-2" data-modal-toggle="defaultModal">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div className='h-3/4 m-2'>
          <textarea
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            className='w-full h-full outline-none bg-transparent resize-none border-2'
            placeholder='Ask Your Question' />
          <button className='bg-indigo-600 w-full text-white font-semibold text-sm p-2 rounded-md' onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
  )
}

export default QuestionModal;