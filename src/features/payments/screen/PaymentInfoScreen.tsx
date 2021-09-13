import React, { FC, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField/TextField'
import jwtDecode from 'jwt-decode'
import { CircularProgress } from '@material-ui/core'
import { Header } from 'components/Header'
import { LocalizationContext } from 'lib/context'
import { getPaymentMethods } from 'features/initialize/initialize.selectors'
import { ButtonBig } from 'components/Button/ButtonBig'
import { getSelectedObject, isSelectedFilter } from 'lib/utils/filters'
import { postMessageNative } from 'lib/utils/postMessage'
import { paymentMethodsModel } from 'lib/constants/paymentMethods'
import { selectToken } from 'features/auth/store/auth.selectors'
import { JWT } from 'lib/models/JWT'
import { withRtl } from 'lib/utils'
import { SelectOptionListPayment } from '../components/SelectOptionListPayment'
import { PaymentCreditCardScreen } from './PaymentCreditCardScreen'
import { PaymentSTCScreen } from './PaymentSTCScreen'

import './Payments.scss'

export const PaymentInfoScreen: FC = () => {
  const { t, isRtl } = useContext(LocalizationContext)
  const paymentMethods = useSelector(getPaymentMethods)
  const [amount, updateAmount] = useState<number>()
  const [payment, updatePayment] = useState(false)
  const [selectedMethod] = getSelectedObject(paymentMethods)
  const token = useSelector(selectToken)
  const isNumber = new RegExp('^[0-9]*$')

  if (payment && amount !== undefined && token)
    switch (selectedMethod.id) {
      case paymentMethodsModel.creditcard:
        return (
          <PaymentCreditCardScreen
            back={updatePayment}
            userID={jwtDecode<JWT>(token).user_id}
            amount={amount}
            title={selectedMethod.title}
            method={selectedMethod ? selectedMethod.value : 'creditcard'}
          />
        )
      case paymentMethodsModel.stcpay:
        return (
          <PaymentSTCScreen
            back={updatePayment}
            userID={jwtDecode<JWT>(token).user_id}
            amount={amount}
            title={selectedMethod.title}
            method={selectedMethod ? selectedMethod.value : 'creditcard'}
          />
        )
    }
  if (token) {
    return (
      <>
        <Header
          title={t.payments.title}
          hideBackButton={false}
          onBackHistory={false}
          backButtonVariant="back"
          onBackAdditional={() => {
            postMessageNative('exit')
          }}
        />
        <div className="payments payments__form container container-fullheight container-fullheight-withButton">
          <div className="payments__amount">
            {isRtl && (
              <span style={{ marginRight: -38 }}>{t.experience.sar}</span>
            )}
            <TextField
              className={withRtl('payments__amount-input')}
              value={amount}
              placeholder="0"
              inputMode="numeric"
              type="tel"
              helperText={t.payments.helperText}
              onChange={(e: any) => {
                const number = e.target.value
                if (isNumber.test(number))
                  updateAmount(number === '' ? number : parseInt(number))
              }}
            />
            {!isRtl && (
              <span style={{ marginLeft: -58 }}>{t.experience.sar}</span>
            )}
          </div>
          <SelectOptionListPayment
            title={t.payments.paymentMethod}
            array={paymentMethods}
          />
          <ButtonBig
            title={t.payments.continue}
            type="full"
            onPress={() => {
              updatePayment(true)
            }}
            disabled={
              !isSelectedFilter(paymentMethods) ||
              (amount !== undefined ? amount : 0) < 100
            }
          />
        </div>
      </>
    )
  } else {
    return (
      <div className="submit container container-fullheight">
        <CircularProgress />
      </div>
    )
  }
}
