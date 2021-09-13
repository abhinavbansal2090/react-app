import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { TextField } from '@material-ui/core'
import { ButtonBig } from 'components/Button/ButtonBig'
import { routes } from 'lib/navigation'
import { LocalizationContext } from 'lib/context'
import { Regexes } from 'lib/constants'
import { Header } from 'components/Header'
import { FirebaseService } from 'services/FirebaseService'
import './LogInScreen.scss'
import { userSlice } from '../../../user/store'
import { authSlice } from '../../store'

const isPhoneValid = (phone: string) => Regexes.internationalPhone.test(phone)

export const LogInScreen: FC = () => {
  const dispatch = useDispatch()
  const { t } = useContext(LocalizationContext)
  const history = useHistory()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const recaptchaRef = useRef(null)
  const textFieldInputProps = {
    style: {
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 37,
      fontSize: 24,
      fontWeight: 500,
    },
  }

  const onPressLogIn = async () => {
    setIsFetching(true)
    FirebaseService.sendCodeToPhone(phoneNumber, recaptchaRef)
      .then(({ verificationId }) => {
        setIsFetching(false)
        history.push({
          pathname: routes.confirmCode,
          state: { verificationId },
        })
      })
      .catch(() => {
        setIsFetching(false)
        setError(true)
      })
  }

  useEffect(() => {
    dispatch(userSlice.actions.reset())
    dispatch(authSlice.actions.reset())
    localStorage.clear()
  }, [dispatch])

  return (
    <>
      <Header hideBackButton={true} />
      <div className="container container-fullheight login-screen__container">
        <div className="login-screen__content-container">
          <p className="login-screen__title">{t.auth.enterPhoneNumber}</p>
          <TextField
            placeholder={'+966 000-000-000'}
            type="tel"
            InputProps={textFieldInputProps}
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.currentTarget.value)
            }
          />
          <p className="login-screen__disclaimer">{t.auth.youllReceiveSms}</p>
          {error && (
            <p className="login-screen__disclaimer login-screen__error">
              {t.auth.errorOccurred}
            </p>
          )}
          <div id={'recaptcha-container'} ref={recaptchaRef} />
        </div>
        <ButtonBig
          title={t.auth.continue}
          onPress={onPressLogIn}
          disabled={isFetching || !phoneNumber || !isPhoneValid(phoneNumber)}
          customStyle={{ marginBottom: 36 }}
        />
      </div>
    </>
  )
}
