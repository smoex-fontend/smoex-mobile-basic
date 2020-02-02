import * as React from 'react'
import { FullScreenModal } from '../components/FullScreenModal'
import styles from './styles/LoginModal.module.scss'
import { asModalProps, useModal, useToggleToast } from 'react-dom-basic-kit'
import { useFormState } from 'react-dom-basic-kit'
import { transformStyles } from 'react-dom-basic-kit'
// import { LoginForm } from './LoginForm'
// import { RegisterForm } from './RegisterForm'
import { ConfirmModal } from '../components/ConfirmModal'

const LoginForm = React.lazy(() =>
  import('./LoginForm' /* webpackChunkName: "login" */),
)
const RegisterForm = React.lazy(() =>
  import('./RegisterForm' /* webpackChunkName: "register" */),
)

const cx = transformStyles(styles)

export const LoginFormInput: React.FC<any> = (props) => {
  const { name, children, defaultValue } = props
  const [data, setData] = useFormState()
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setData({ [name]: value })
    },
    [name],
  )
  React.useEffect(() => {
    if (defaultValue) {
      if (name === 'password') {
        setTimeout(() => {
          setData({ [name]: defaultValue })
        }, 10)
      } else {
        setData({ [name]: defaultValue })
      }
    }
  }, [])

  return (
    <div className={cx('login-input-wrapper')}>
      <input
        className={cx('login-input')}
        value={data[name] || ''}
        onChange={onChange}
      />
      {children}
    </div>
  )
}

export const LoginModal: React.FC<any> = (props) => {
  const [form, setForm] = React.useState('login')
  const onCloseModal = () => {
    props.onClose()
  }
  const [showConfirm] = useModal((mProps: any) => (
    <ConfirmModal {...mProps}>{`test`}</ConfirmModal>
  ))
  const toggleToast = useToggleToast()
  const toggleMessage = () => {
    toggleToast('test')
  }
  return (
    <FullScreenModal {...asModalProps(props)} onClose={onCloseModal}>
      <div className={cx('login-modal')}>
        <div className={cx('login-modal-logo')}>SMOEX</div>
        {form === 'login' && (
          <LoginForm
            toRegister={() => setForm('register')}
            callback={onCloseModal}
          />
        )}
        {form === 'register' && (
          <RegisterForm
            toLogin={() => setForm('login')}
            callback={onCloseModal}
          />
        )}
        <br />
        <div onClick={showConfirm}>TEST CONFIRM</div>
        <br />
        <div onClick={toggleMessage}>TEST TOAST</div>
      </div>
    </FullScreenModal>
  )
}
