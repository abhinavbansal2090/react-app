import React, { FC, useContext } from 'react'
import { LocalizationContext } from 'lib/context'
import { ButtonBig } from 'components/Button/ButtonBig'
import { postMessageNative } from 'lib/utils/postMessage'
import { icons } from 'assets'

export const PaymentStatus: FC = () => {
  const { t } = useContext(LocalizationContext)
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const status = urlParams.get('status') !== 'failed' ? true : false
  return (
    <>
      <div
        className={`container container-fullheight container-fullheight-withButton payments__status ${
          status ? '' : 'payments__status-failed'
        }`}
      >
        <div className="submit__icon">
          <img src={status ? icons.check : icons.error} alt="Tick icon" />
        </div>
        <p className="submit__info">
          {status
            ? t.payments.form.status.success
            : t.payments.form.status.failure}
        </p>
        <p className="submit__subtitle">
          {status
            ? t.payments.form.status.successSub
            : urlParams.get('message')}
        </p>
        <ButtonBig
          title={t.business.continue}
          onPress={() => {
            postMessageNative('exit')
          }}
        />
      </div>
    </>
  )
}
