import { isProduction } from '../constants'

const FIREBASE_CONFIG_DEV = {
  apiKey: 'AIzaSyBtCZU6P4EORQmlPSryUvrn7uIpYpR_thk',
  authDomain: 'temporary-expapp.firebaseapp.com',
  databaseURL: 'https://temporary-expapp.firebaseio.com',
  projectId: 'temporary-expapp',
  storageBucket: 'temporary-expapp.appspot.com',
  messagingSenderId: '312022671946',
  appId: '1:312022671946:web:5d447ab34461e5189d3cb3',
  measurementId: 'G-7VJW5DBHQZ',
}

const FIREBASE_CONFIG_PROD = {
  apiKey: 'AIzaSyCL98p6lxmSNJ1E1ofIdfDMQwICXnM3TDY',
  authDomain: 'track-app-ab6ed.firebaseapp.com',
  databaseURL: 'https://track-app-ab6ed.firebaseio.com',
  projectId: 'track-app-ab6ed',
  storageBucket: 'track-app-ab6ed.appspot.com',
  messagingSenderId: '489892683158',
  appId: '1:489892683158:web:cc4878cbdddca46b1651b7',
  measurementId: 'G-NE1C249JC5',
}

export const FIREBASE_CONFIG = isProduction()
  ? FIREBASE_CONFIG_PROD
  : FIREBASE_CONFIG_DEV
