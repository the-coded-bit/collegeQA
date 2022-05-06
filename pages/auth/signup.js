import React,{useEffect, useState, useContext} from 'react'
import { authContext } from '../../contexts/authWrapper';
import Page from '../../layouts/Page'

function signup() {

  //get current user, loading, signup function from authContext
  const {authUser, signup} = useContext(authContext);

  // states - fullName, Email, Password, ConfirmPassword
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //check if User is already logged in, if User present send user to main Page
  useEffect(() =>{
    if(authUser){
      //TODO : user already present redirect to main Page
    }
  }, [])


  //handleSignUp button
  const handleSignUp = async (e) =>{
    e.preventDefault();
    console.log('sign up clicked');
    if(email != '' && password != '' && confirmPassword === password){
      try{
        const user = await signup(email, confirmPassword);
        // TODO : enable toast for successfull signup
        // TODO : store user according to UID, Username, email
        
      }
      catch(err){
        console.log(err);
      }
    }
    else if(confirmPassword != password){
      // TODO : enable toast for confirm pass and pass not same
      console.log('confirm password and password not same');
    }


  }

  console.log('render function of signup page');
  return (
    <Page>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mt-0 text-center text-3xl font-extrabold text-gray-900 mb-2">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name" 
              value={fullName}
              onChange = {(e) => setFullName(e.target.value)} />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email" 
              value={email}
              onChange = {(e) => setEmail(e.target.value)} />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password" 
              value={password}
              onChange= {e => setPassword(e.target.value)} />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange= {e => setConfirmPassword(e.target.value)} />

            <button
              type="submit"
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={(e) => handleSignUp(e)}
            >Create Account
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Terms of Service
              </a> and
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <a className="no-underline border-b border-blue text-blue" href="../login/">
              Log in
            </a>.
          </div>
        </div>
      </div>
    </Page>
  )
}

export default signup