import React from 'react'
import { useRouter } from 'next/router'
import { Question, Answer } from '../components';

function Details() {
    const router = useRouter();
    const { qid, id } = router.query;
    console.log(qid, id);
    return (
        qid == 'question' ?
            <Question id = {id}/> :
            <Answer id = {id}/>
    )
}

export default Details;