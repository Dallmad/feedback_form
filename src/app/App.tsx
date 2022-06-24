import React from 'react';
import s from './App.module.scss'
import {FeedbackForm} from '../features/FeedbackForm/FeedbackForm';

export const App = () => {
  return (
    <div className={s.app}>
      <h2>Feedback Form</h2>
        <FeedbackForm/>
    </div>
  );
}