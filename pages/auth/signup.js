import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { authContext } from '../../contexts/authWrapper';
import { db, storage } from '../../firebase/firebase';
import Page from '../../layouts/Page';


function signup() {

  //get router
  const router = useRouter();

  //get current user, loading, signup function from authContext
  const { authUser, signup } = useContext(authContext);

  // states - fullName, Email, Password, ConfirmPassword
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setfile] = useState(null);

  //check if User is already logged in, if User present send user to main Page
  useEffect(() => {
    if (authUser) {
      //TODO : user already present redirect to main Page
      toast.success('Already SignedIn!! \n Redirecting to Home Page', { duration: 5000 });
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [])


  //handleSignUp button
  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('sign up clicked');
    if (email != '' && password != '' && confirmPassword === password) {
      try {
        const userPromise = toast.promise(
          signup(email, confirmPassword),
          {
            loading : 'Creating Account....',
            success : <b> Account Created! </b>,
            error : <b> Error Occurred </b>
          });

          const user = await userPromise;
          console.log(user);

        // TODO : enable toast for successfull signup
        toast.success('SignedIn Successfully!!!');


        //TODO : Upload the Profile Picture if Provided
        const profileRef = ref(storage, `profilePictures/${user.user.uid}`);

        const uploadResultPromise = toast.promise(
          uploadBytes(profileRef, file),
          {
            loading : 'Setting Up Account....',
            success : <b> Account Setup Done! </b>,
            error : <b> Error Occurred </b>
          }
        );

        const uploadResult = await uploadResultPromise;

        // TODO : store user according to UID, Username, email, questions asked and Answers given

        //TODO : to store user Profile Image get User Profile Image
        // download link from store 
        const profileUrl = await getDownloadURL(profileRef);

        const userStore = {
          name : fullName,
          email : email,
          uid : user.user.uid,
          photoURL : profileUrl,
          questionsAsked : [],
          answersGiven : []
        }

        await setDoc(doc(db, `users/${user.user.uid}`), userStore);

      }
      catch (err) {
        console.log(err);
      }
    }
    else if (confirmPassword != password) {
      // TODO : enable toast for confirm pass and pass not same
      toast.error(`Password didn't match`);
    }


  }

  console.log('render function of signup page');
  return (
    <Page bgColor = 'bg-slate-100'>

      {/* add toast */}
      <Toaster position='top-right' />
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
              onChange={(e) => setFullName(e.target.value)} />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)} />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)} />

            <label
              className="block border border-grey-light w-full p-3 rounded mb-4"
              htmlFor='inputImage'>
              <div className='text-indigo-600  text-center font-semibold cursor-pointer'>Upload Image</div>
              <input
                id='inputImage'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  setfile(e.target.files[0]);
                  toast.success('Profile Photo Added!');
                }}
              />
            </label>

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
            </a>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default signup