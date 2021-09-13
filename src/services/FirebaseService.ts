import * as firebase from 'firebase'
import { MutableRefObject } from 'react'
import { FIREBASE_CONFIG } from 'lib/configs'

export const FirebaseService = {
  initialize: () => {
    firebase.initializeApp(FIREBASE_CONFIG)
    firebase.auth().useDeviceLanguage()
  },
  sendCodeToPhone: (
    phoneNumber: string,
    recaptchaRef: MutableRefObject<any>
  ) => {
    return firebase.auth().signInWithPhoneNumber(
      phoneNumber,
      new firebase.auth.RecaptchaVerifier(recaptchaRef.current, {
        size: 'invisible',
      })
    )
  },
  confirmCode: (verificationId: string, code: string) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    )

    return firebase.auth().signInWithCredential(credential)
  },
  refreshToken: () => firebase.auth().currentUser?.getIdTokenResult(),
}
