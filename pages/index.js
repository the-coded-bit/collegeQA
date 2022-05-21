import { useContext, useState, useEffect } from 'react'
import Page from '../layouts/Page'
import { authContext } from '../contexts/authWrapper'
import { collection, doc, getDoc, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { QuestionModal, Navbar, AnswerModal, FrontCard } from '../components';



export default function Home() {
  const { authUser, loading } = useContext(authContext);

  // user states of question and answer
  const [questionModal, setQuestionModal] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);
  const [questionID, setquestionID] = useState('');
  const [questionArray, setQuestionArray] = useState([]);

  const imageUrl = 'https://source.unsplash.com/1600x900/?beach';

  //read top 10 questions according to questionId
  useEffect(() => {
    console.log('use effect of home page');
    const initSetup = async () => {

      // collection reference to questions 
      const questionsRef = collection(db, 'questions');
      //creating query to get only top 5 questions docs
      const q = query(questionsRef, limit(6));
      // applying query

      const querySnapshot = await getDocs(q);
      let questionArray = [];
      querySnapshot.forEach(document => {
        // console.log(document);
        let { _document: { data: { value: { mapValue: { fields: { question: { stringValue } } } } } } } = document;
        let { _document: { data: { value: { mapValue: { fields: { questionId: { stringValue: questionId } } } } } } } = document;
        // console.log(stringValue, questionId);
        questionArray.push({ stringValue, questionId });
      });

      // assigning question array to question state
      setQuestionArray(questionArray);
    }

    initSetup();

  }, [])

  console.log('printing user at time of / page loading', authUser, loading);
  return (
    (
      questionModal ?
        <QuestionModal modalStatus={setQuestionModal}></QuestionModal> :
        answerModal ? <AnswerModal modalStatus={setAnswerModal} questionId={questionID} /> :
          <Page title='home' content='home Page' >
            <Navbar />
            <div className='h-full'>
              {
                // TODO : add answer given by one person, update his name, date answered on.
                 questionArray.map(({ stringValue, questionId }) => (
                  <FrontCard stringValue={stringValue} questionId = {questionId} setAnswerModal = {setAnswerModal} setquestionID = {setquestionID} key = {questionId}/>
                ))
              }
            </div>

            <div className='fixed bottom-12 right-6 '>
              <button
                onClick={() => setQuestionModal(!questionModal)}
                className="p-0 w-12 h-12 bg-indigo-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
                  <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
                </svg>
              </button>
            </div>
          </Page>
    )
  )
}
