import React, { createRef, FC, useContext, useState } from 'react'
import cardValidator from 'card-validator'
import { Header } from 'components/Header'
import { LocalizationContext } from 'lib/context'
import { ButtonBig } from 'components/Button/ButtonBig'
import { MOYASAR_PUBLIC_KEY } from 'lib/configs/moyasar'
import { Input } from 'features/business/components/Input'
import { getLabelsTranslationByLocale } from 'features/locale/utils'
import { TagLabel } from 'lib/models'
import { paymentsRepositiory } from 'services/payments/repository'

import './Payments.scss'

type Props = {
  back: any
  method: string
  title: TagLabel[]
  amount: number
  userID: string
}

export const PaymentCreditCardScreen: FC<Props> = ({
  back,
  method,
  amount,
  title,
  userID,
}) => {
  const { t } = useContext(LocalizationContext)
  const paymentRef = createRef<HTMLFormElement>()
  const [card, updateCard] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
  })
  const [errors, updateError] = useState({
    cvc: '',
    number: '',
    name: '',
    moyasar: '',
  })

  const handleInputChange = (e: any) => {
    const { name } = e.target
    let { value } = e.target
    let test = false

    updateError({
      ...errors,
      moyasar: '',
    })

    switch (name) {
      case 'number':
        value = value.replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ')
        if (value[value.length - 1] === ' ') {
          value = value.trim()
          test = true
        } else {
          test = cardValidator.number(value).isPotentiallyValid
        }
        if (test)
          updateError({
            ...errors,
            number: '',
          })
        break
      case 'cvc':
        test = cardValidator.cvv(value).isPotentiallyValid
        if (test)
          updateError({
            ...errors,
            cvc: '',
          })
        break
      case 'expiry':
        if (value.length === 2) {
          value = `${value}/`
        }
        test = cardValidator.expirationDate(value).isPotentiallyValid
        break
      case 'name':
        test = cardValidator.cardholderName(value).isValid
        if (test)
          updateError({
            ...errors,
            name: '',
          })
        break
    }

    if (test) updateCard({ ...card, [name]: value })
  }

  const handlePayments = async (e: any) => {
    e.preventDefault()
    if (paymentRef.current) {
      const refForm = paymentRef.current
      // eslint-disable-next-line
      // @ts-ignore
      const form = new URLSearchParams(new FormData(refForm))
      const response = await paymentsRepositiory.moyasarRequest(form)
      if (response.errors) {
        updateError({
          ...errors,
          moyasar: t.payments.form.error.moyasar,
        })
      } else {
        const url = response.source.transaction_url
        window.location.href = url
      }
    }
  }

  return (
    <>
      <Header
        title={t.payments.title}
        hideBackButton={false}
        subTitle={getLabelsTranslationByLocale(title)}
        onBackHistory={false}
        onBackAdditional={() => {
          back(false)
        }}
        backButtonVariant="back"
      />
      <div className="payments container container-fullheight container-fullheight-withButton">
        <form
          ref={paymentRef}
          className="payments__form"
          onSubmit={handlePayments}
        >
          <Input
            type="text"
            name="name"
            label={t.payments.form.labels.name}
            value={card.name}
            errorText={errors.name}
            error={errors.name !== ''}
            onLeave={() => {
              if (card.name.split(/\W+/).length < 2) {
                updateError({
                  ...errors,
                  name: t.payments.form.error.name,
                })
              }
            }}
            placeholder={t.payments.form.placeholder.name}
            onChange={handleInputChange}
          />
          <Input
            type="tel"
            name="number"
            label={t.payments.form.labels.number}
            value={card.number}
            errorText={errors.number}
            error={errors.number !== ''}
            onLeave={() => {
              if (card.number.replace(/\s/g, '').length < 16) {
                updateError({
                  ...errors,
                  number: t.payments.form.error.number,
                })
              }
            }}
            placeholder={t.payments.form.placeholder.number}
            onChange={handleInputChange}
          />
          <Input
            type="tel"
            name="expiry"
            label={t.payments.form.labels.date}
            value={card.expiry}
            placeholder={t.payments.form.placeholder.date}
            onChange={handleInputChange}
          />
          <Input
            type="tel"
            name="cvc"
            label={t.payments.form.labels.cvc}
            value={card.cvc}
            errorText={errors.cvc}
            error={errors.cvc !== ''}
            onLeave={() => {
              if (card.cvc.length < 3) {
                updateError({
                  ...errors,
                  cvc: t.payments.form.error.cvc,
                })
              }
            }}
            placeholder={t.payments.form.placeholder.cvc}
            onChange={handleInputChange}
          />
          {/* SAR to HALAL */}
          <input type="hidden" name="amount" value={amount * 100} />
          <input type="hidden" name="source[type]" value={method} />
          <input type="hidden" name="source[name]" value={card.name} />
          <input
            type="hidden"
            name="source[number]"
            value={card.number.replace(/\s/g, '')}
          />
          <input type="hidden" name="source[cvc]" value={card.cvc} />
          <input
            type="hidden"
            name="source[year]"
            value={`20${card.expiry.split('/')[1]}`}
          />
          <input
            type="hidden"
            name="source[month]"
            value={card.expiry.split('/')[0]}
          />
          <input required type="hidden" name="description" value={userID} />
          <input
            required
            type="hidden"
            name="callback_url"
            value={`${window.location.protocol}//${window.location.host}/status`}
          />
          <input
            type="hidden"
            name="publishable_api_key"
            value={MOYASAR_PUBLIC_KEY}
          />
          <p className="input__error">{errors.moyasar}</p>
          <ButtonBig
            disabled={[
              card.number === '',
              card.cvc === '',
              card.name === '',
              card.expiry === '',
              errors.number !== '',
              errors.cvc !== '',
            ].some(Boolean)}
            title={t.payments.continue}
            actionType="submit"
            type="full"
          />
        </form>
      </div>
    </>
  )
}
