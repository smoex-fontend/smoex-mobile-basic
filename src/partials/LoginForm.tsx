import * as React from 'react'
import { FullScreenModal } from '../components/FullScreenModal'
import styles from './styles/LoginModal.module.scss'
import {
  asModalProps,
  useToggleToast,
  useToastError,
} from 'react-dom-basic-kit'
import { useFormState } from 'react-dom-basic-kit'
import { transformStyles } from 'react-dom-basic-kit'
import { enhanceFormComponent } from 'react-dom-basic-kit'
import { useActionCallback } from 'redux-async-kit'
import { accountAsyncAction, commonSlice } from 'smoex-common-business'
import { LoginFormInput } from '././LoginModal'

const cx = transformStyles(styles)

const TLoginForm: React.FC<any> = (props) => {
  const { toRegister, callback } = props
  const [data, setData] = useFormState()
  const [loginType, setLoginType] = React.useState('password')

  const [login, LoginLoading] = commonSlice.useAction(accountAsyncAction.login)
  const [sendCode, sendLoading] = commonSlice.useAction(
    accountAsyncAction.sendCode,
  )
  const [verify, verifyLoading] = commonSlice.useAction(
    accountAsyncAction.verifyCode,
  )
  const loading = LoginLoading || sendLoading

  const [onLogin, loginError] = useActionCallback(async () => {
    const { account, password, code } = data
    if (loginType === 'password') {
      await login(account, password)
    } else if (loginType === 'code') {
      await verify(code, 'login')
    }
    if (callback) {
      callback()
    }
  }, [login, data, loginType, verify]) as any

  const [onSendCode, sendCodeError] = useActionCallback(async () => {
    const { account } = data
    await sendCode(account, 'login')
  }, [sendCode, data]) as any

  useToastError(loginError)
  useToastError(sendCodeError)

  React.useEffect(() => {
    setData({ password: '', code: '' })
  }, [loginType])

  const onChangeType = () => {
    setLoginType((x) => (x === 'password' ? 'code' : 'password'))
  }

  return (
    <form className={cx('login-form')}>
      <div className={cx('login-label')}>
        PHONE{loginType === 'password' && '/USERNAME'}
      </div>
      <LoginFormInput name="account" defaultValue="lynnkoo" />
      <div className={cx('login-label')}>
        {loginType === 'password' ? 'PASSWORD' : 'VERIFY CODE'}
      </div>
      {loginType === 'password' && (
        <LoginFormInput name="password" defaultValue="111111">
          <div className={cx('login-send-code')}>FORGET PASSWORD</div>
        </LoginFormInput>
      )}
      {loginType === 'code' && (
        <LoginFormInput name="code">
          <div className={cx('login-send-code')} onClick={onSendCode}>
            SEND CODE
          </div>
        </LoginFormInput>
      )}
      <div className={cx('login-change-type')} onClick={onChangeType}>
        LOGIN BY {loginType !== 'password' ? 'PASSWORD' : 'VERIFY CODE'}
      </div>
      <div className={cx('login-form-btn', { loading })} onClick={onLogin}>
        LOGIN{(LoginLoading || verifyLoading) && '...'}
      </div>
      <div className={cx('login-form-btn')} onClick={toRegister}>
        REGISTER
      </div>
    </form>
  )
}

export const LoginForm = enhanceFormComponent(TLoginForm)
