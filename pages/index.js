import { useContext } from 'react'
import Page from '../layouts/Page'
import {authContext}  from '../contexts/authWrapper'


export default function Home() {
  const {authUser, loading} = useContext(authContext);

  console.log('printing user at time of / page loading', authUser, loading);
  return (
    <Page title='home' content = 'home Page'>
      Home Page
      <div className='text-blue-500 text-bold'>helll</div>
    </Page>
  )
}
