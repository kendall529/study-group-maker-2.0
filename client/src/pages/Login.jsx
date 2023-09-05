import { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { setUsername } from '../store/actions/dashboardActions';
import { useDispatch } from 'react-redux';

import { registerNewUser } from '../utils/webSockConnection/webSockConnection';

import Auth from '../utils/auth';

const UsernameInput = ({ currentUsername, updateUsername }) => {
  return (
      <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
          placeholder="Username"
          name="username"
          type="text"
          value={currentUsername}
          onChange={(event) => { 
            updateUsername(event.target.value); }}
      />
  );
};

const Login = (props) => {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({ username: '', password:''});
    const [login, {error, data}] = useMutation(LOGIN_USER);
    const navigate = useNavigate();
    

    
    const handleChange = (event) => {
        const {name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    }

    // submission form
    const handleFormSubmit = async (event) => {
    event.preventDefault();

    dispatch(setUsername(formState.username)); // sets username in Redux store

    registerNewUser(formState.username);

    try {

      console.log('attempting login ...');
      const mutationRes = await login({
        variables: { username: formState.username, password: formState.password },
      });

      Auth.login(mutationRes.data.login.token);


    } catch (e) {
        console.error('Error object:', e);
    }

    // clearing the form
    setFormState({
      username: '',
      password: '',
    });

    navigate('/Dashboard');
  };

  return (
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="mt-14 text-white text-2xl flex justify-center font-semibold">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/Dashboard">To the dashboard.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className='mb-6 mt-6 flex justify-center'>
                  <label htmlFor="username" className='block mb-6 text-sm font-medium text-gray-900 dark:text-white'></label>
                  <UsernameInput
                    currentUsername={formState.username}
                    updateUsername={(newUsername) => setFormState({ ...formState, username: newUsername })}
                  />
                </div>
                <div className='mb-6 flex justify-center'>
                  <label htmlFor="password" className='block mb-6 text-sm font-medium text-gray-900 dark:text-white'></label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                </div>
                <div className='mb-6 flex justify-center'>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
                </div>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Login;