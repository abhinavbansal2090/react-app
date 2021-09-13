import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import React, { FC, useContext, useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'
import { useCustomTextInputStyle } from 'lib/utils'
import { ButtonBig } from 'components/Button/ButtonBig'
import { routes } from 'lib/navigation'
import { ConfigCookies } from 'lib/constants'
import { LocalizationContext } from 'lib/context'
import { FirebaseService } from 'services/FirebaseService'
import {
  selectGettingUserResult,
  selectUser,
  userSlice,
} from 'features/user/store'
import { GetUserResult } from 'features/user/types'
import { authSlice, selectToken } from '../../store'
import './ConfirmCodeScreen.scss'

export const ConfirmCodeScreen: FC = () => {
  const gettingUserResult = useSelector(selectGettingUserResult)
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const { t } = useContext(LocalizationContext)
  const history = useHistory()
  const [code, setCode] = useState('')
  const [error, setError] = useState<'notAProvider' | 'error' | undefined>()
  const [isFetching, setIsFetching] = useState(false)
  const { state: locationState } = useLocation<{ verificationId: string }>()
  const textFieldClasses = useCustomTextInputStyle(true, true)
  const textFieldInputProps = {
    classes: textFieldClasses,
    style: {
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 37,
      fontSize: 24,
      fontWeight: 500,
    },
  }

  const onResendCode = () => {
    history.goBack()
  }

  const onErrorClick = () => {
    setError(undefined)
  }

  const onConfirmCode = () => {
    if (locationState.verificationId && code.trim().length > 0) {
      setIsFetching(true)

      return FirebaseService.confirmCode(locationState.verificationId, code)
        .then(async (res) => {
          const tokenRes = await res.user?.getIdTokenResult()

          setIsFetching(false)

          if (!tokenRes) {
            return setError('error')
          }

          Cookies.set(ConfigCookies.Token, tokenRes.token)
          dispatch(authSlice.actions.setToken(tokenRes.token))
          dispatch(userSlice.actions.fetchUserMe())
        })
        .catch(() => {
          setError('error')
          setIsFetching(false)
        })
    }
  }

  useEffect(() => {
    if (
      [
        gettingUserResult === GetUserResult.Success,
        token,
        user && user.isProvider,
      ].every(Boolean)
    ) {
      setError(undefined)
      dispatch(authSlice.actions.setIsAuthenticated(true))
      history.push(routes.manage)
    }

    if (
      gettingUserResult === GetUserResult.Success &&
      user &&
      !user.isProvider
    ) {
      setError('notAProvider')
    }

    if (
      gettingUserResult === GetUserResult.Error ||
      gettingUserResult === GetUserResult.NotFound
    ) {
      setError('error')
    }
  }, [dispatch, gettingUserResult, history, token, user])

  return (
    <div className="container container-fullheight confirm-code-screen__container">
      <div className="confirm-code-screen__content-container">
        <p className="confirm-code-screen__title">{t.auth.enterCode}</p>
        <TextField
          placeholder={'_ _ _ _ _ _'}
          InputProps={textFieldInputProps}
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.currentTarget.value.trim())
          }
        />
        <p className="confirm-code-screen__resend-code" onClick={onResendCode}>
          {t.auth.resendTheCode}
        </p>
        {error === 'error' && (
          <p className="confirm-code-screen__error" onClick={onErrorClick}>
            {t.auth.enterCodeError}
          </p>
        )}
        {error === 'notAProvider' && (
          <p className="confirm-code-screen__error" onClick={onErrorClick}>
            {t.auth.notAProvider}
          </p>
        )}
      </div>
      <ButtonBig
        title={t.auth.continue}
        onPress={onConfirmCode}
        customStyle={{ marginBottom: 36 }}
        disabled={isFetching || Boolean(error)}
      />
    </div>
  )
}
