import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { authContext } from '../contexts/authWrapper';

function Navbar() {
  const imageUrl = 'https://source.unsplash.com/1600x900/?beach';
  // getting logout from authContext
  const { logout } = useContext(authContext);

  // grabbing router object
  const router = useRouter();

  const handleLogout = async () => {
    toast.promise(
      logout(),
      {
        loading : 'Logging Off !!',
        success : <b>GoodBye!!!</b>,
        error : <b>Could not Log Off</b>
      }
    )
  }

  const handleProfileBtn = () =>{
    router.push
  }
  return (
    <>
      <Toaster position='top-right'/>
      <nav className="bg-white border-black border-b-2 px-2 sm:px-4 py-2.5 rounded flex justify-between items-center mb-2">
        {/* left side of navbar */}
        <div className='flex w-1/4 items-center gap-x-3'>
          {/* TODO: put App icon */}
          <img className="w-12 h-12 rounded-full" src={imageUrl} alt="icon" />
          {/* App name */}
          <div className='text-indigo-600 text-4xl font-bold uppercase'>QA me</div>
        </div>
        {/* right side of navbar */}
        <div className='flex w-2/4 items-center gap-x-3 justify-end'>
          {/* search bar */}
          <div className='h-8 relative  flex flex-row rounded-xl border-2 border-slate-100 hover:border-indigo-600 m-3'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-6 text-indigo-600 absolute right-0 mr-3 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              type='text'
              placeholder='Search Category...'
              className='w-4/5 h-inherit  bg-inherit rounded-xl  text-sm focus:outline-none ml-3'
            />
          </div>
          {/* profile image */}
          <button className='group inline-block relative'>
            <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={imageUrl} alt="Bordered avatar"></img>
            <ul className='hidden absolute text-slate-100 text-semibold shadow -left-6 text-center z-10 bg-indigo-600 rounded p-3 group-hover:block' aria-labelledby='dropdowndefault'>
              <li onClick={handleProfileBtn}>Profile</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </button>
        </div>
      </nav>

    </>
  )
}

export default Navbar;