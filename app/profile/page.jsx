"use client"

import React from 'react';
import ProfilePage from '../../components/profilePage'
import { Provider } from 'react-redux';
import store from '@/store/store';

const page = () => {
  return (
    <>
    <Provider store={store} >
        <ProfilePage/>
    </Provider>
    </>
  )
}

export default page