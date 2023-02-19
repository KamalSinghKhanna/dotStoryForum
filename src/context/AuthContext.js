import { createContext, useEffect, useReducer, useState } from 'react';
import { auth } from '../config/firebase';
import { USER_LOGIN, USER_LOGOUT } from '../constants/constants';
import { authenticate } from '../helper/auth';

export const AuthContext = createContext({
  userDetails: null,
  loading: false,
});

export const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, userDetails: action.payload };
    case USER_LOGOUT:
      auth.signOut();
      return { ...state, userDetails: null };
    default:
      return state;
  }
};

export const AuthContextProvider = props => {
  const [state, dispatch] = useReducer(authReducer, {
    userDetails: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(data => {
      data
        ? authenticate(data?.accessToken).then(user => {
            console.log(user);
            let userObj = {};
            userObj = {
              ...user,
              token: data?.accessToken,
            };
            dispatch({
              type: USER_LOGIN,
              payload: userObj,
            });
          })
        : dispatch({
            type: USER_LOGOUT,
          });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  console.log({ loading });
  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, loading, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
