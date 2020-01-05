import * as React from 'react'
import { FullScreenModal } from '../components/FullScreenModal'
import styles from './styles/LoginModal.module.scss'
import {
  asModalProps,
  useToggleToast,
  useToastError,
  useModal,
} from 'react-dom-basic-kit'
import { useFormState } from 'react-dom-basic-kit'
import { transformStyles } from 'react-dom-basic-kit'
import { enhanceFormComponent } from 'react-dom-basic-kit'
import { useActionCallback, useCurrentCallback } from 'redux-async-kit'
import { accountAsyncAction, commonSlice } from 'smoex-common-business'
import { LoginFormInput } from './LoginModal'
import { ConfirmModal } from '../components/ConfirmModal'

const cx = transformStyles(styles)

const TRegisterForm: React.FC<any> = (props) => {
  const { toLogin, callback } = props
  const [data] = useFormState()

  const toggleToast = useToggleToast()

  const [showConfirm] = useModal((mProps: any) => (
    <ConfirmModal {...mProps}>
      Register success <br />
      Please complate your information.
    </ConfirmModal>
  ))

  const [sendCode, sendLoading] = commonSlice.useAction(
    accountAsyncAction.sendCode,
  )
  const [verify, verifyLoading] = commonSlice.useAction(
    accountAsyncAction.verifyCode,
  )
  const account = commonSlice.useSelector((state: any) => state.account.payload)

  const onRegistered = useCurrentCallback(() => {
    if (account.group === 'member') {
      toggleToast('already register so to login')
      callback()
    } else {
      showConfirm()
    }
  }, [account])

  const [onRegister, registerError] = useActionCallback(async () => {
    const { code } = data
    await verify(code, 'register')
    onRegistered.current()
  }, [data, verify, account]) as any

  const [onSendCode, sendCodeError] = useActionCallback(async () => {
    const { account } = data
    await sendCode(account, 'register')
  }, [sendCode, data]) as any

  useToastError(registerError)
  useToastError(sendCodeError)
  return (
    <form className={cx('login-form')}>
      <div className={cx('login-label')}>PHONE</div>
      <LoginFormInput name="account" />
      <div className={cx('login-label')}>VERIFY CODE</div>
      <LoginFormInput name="code">
        <div className={cx('login-send-code')} onClick={onSendCode}>
          SEND CODE
        </div>
      </LoginFormInput>
      <div className={cx('login-back')} onClick={toLogin}>
        Back To Login
      </div>
      <div className={cx('login-form-btn')} onClick={onRegister}>
        REGISTER{verifyLoading && '...'}
      </div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
    </form>
  )
}

export const RegisterForm = enhanceFormComponent(TRegisterForm)
