import React, { useState, useEffect, useContext } from 'react'
import { authContext } from '../../contexts/authWrapper';
import Page from '../../layouts/Page'

function login() {

  //get login function, authUser, setAuthUser, loading from context
  const {authUser, login, loading, setAuthUser} = useContext(authContext);

  // email and password states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //check if we already have the user at time of launching into login route
  useEffect(() => {
		console.log('useEffect of login');
		console.log('user status =', authUser);
		console.log('loading status', loading);
		if (!authUser && !loading) {
			// it means we still don't have user
			console.log(`we still don't have user`);
			
		}
		else {
			// we have user
			console.log('yay!!! we got user');
		}
	}, [authUser]);


  //handle Log in button
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('login button clicked');
    if (email != '' && password != '') {
      try {
        const user = await login(email, password);
        console.log(user);
        setAuthUser(user);
        console.log('end of useEffect of login');
      } catch (err) {
        console.log(err);
      }
    }

  }

  return (
    <Page>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>

          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(e) => handleSubmit(e)}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default login