import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { authContext } from '../contexts/authWrapper';
import { db } from '../firebase/firebase';

function AnswerModal({ modalStatus, questionId }) {

  // grabbing user
  const { authUser } = useContext(authContext);

  // state for answer
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    console.log(questionId);

    //extract question from question Id
    const initSetup = async () => {
      const documentPromise = toast.promise(
        getDoc(doc(db, `questions/${questionId}`)),
        {
          loading: 'loading question',
          success: <b>question Loaded!!</b>,
          error: <b>error loading question!</b>
        }
      )
      const document = await documentPromise;
      let { _document: { data: { value: { mapValue: { fields: { question: { stringValue } } } } } } } = document;

      setQuestion(stringValue);
    }


    initSetup();
  }, []);

  // handling submit button
  const handleSubmit = async () => {
    console.log('submit button triggered');
    // return if answer string is empty
    // TODO : prompt user to enter answer.
    if (answer == '') return;

    //creating query promise to resolve if the user answering the question is as same as user asked the question.
    // preventing the user from answering the his/her own question.
    const queryPromise = new Promise(async (resolve, reject) => {
      // check whether user who asked the question is trying to answer the question
      // in that case prompt user cannot answer his own question
      const q = query(collection(db, `users`), where('questionsAsked', 'array-contains', `${questionId}`));
      const querySnapshot = await getDocs(q);
      console.log('querySnapshots', querySnapshot);

      querySnapshot.forEach((doc) => {
        if (doc.id == authUser.uid) {
          toast.error('Cannot Answer Your Own Question');
          reject();
        }
      });
      resolve();
    });

    await queryPromise;


    // we have to update the answer string in user's collection
    // as well as in question's collection

    // TODO : update user collection answerGiven field
    const userDocRef = doc(db, `users/${authUser.uid}`);

    // creating answer object to store in user collection and question collection
    const answerObject = {
      questionId: questionId,
      answer: answer,
      userAnswered: authUser.uid,
      timestamp: + new Date()
    }

    toast.promise(
      // updating answerObject in user collection
      updateDoc(userDocRef, {
        answersGiven: arrayUnion(answerObject)
      }),
      {
        loading: <b>Submitting Response...</b>,
        success: <b>Response Submitted!!!</b>,
        error: <b>Cannot Register your answer.</b>
      }
    );

    //updating answerObject in questions collection
    await updateDoc(
      doc(db, `questions/${questionId}`),
      {
        answers: arrayUnion(answerObject)
      });

  }
  
  return (
    <div className='w-screen h-screen bg-slate-100 flex'>
      <Toaster position='top-right' />
      <div className=' m-auto w-4/5 h-4/6 bg-white shadow-xl relative'>
        <div className='h-12'>
          <button
            type="button"
            onClick={() => modalStatus(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-2 top-2" >
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
        <div className='truncate w-full m-2 '>{question}</div>
        <div className='h-3/4 m-2'>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className='w-full h-full outline-none bg-transparent resize-none border-2'
            placeholder='Enter Your Opinion' />
          <button
            className='bg-indigo-600 w-full text-white font-semibold text-sm p-2 rounded-md'
            onClick={handleSubmit}>
            Submit
          </button>
        </div>

      </div>
    </div>
  )
}

export default AnswerModal