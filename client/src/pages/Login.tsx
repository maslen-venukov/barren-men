import React from 'react'
import { Form, Input, Button } from 'antd'
import useTypedDispatch from 'hooks/useTypedDispatch'
import useTypedSelector from 'hooks/useTypedSelector'
import { login } from 'store/api/auth'

interface LoginFormValues {
  loginOrEmail: string,
  password: string
}

const Login: React.FC = () => {
  const dispatch = useTypedDispatch()

  const { loading } = useTypedSelector(state => state.auth)

  const [form] = Form.useForm()

  const onFinish = (values: LoginFormValues) => {
    const { loginOrEmail, password } = values
    dispatch(login(loginOrEmail, password))
    form.resetFields()
  }

  return (
    <div className="login">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        validateTrigger="onBlur"
        className="login__form"
      >
        <Form.Item
          label="Логин или email"
          name="loginOrEmail"
          rules={[{ required: true, message: 'Пожалуйста введите ваш логин или email!' }]}
        >
          <Input placeholder="Логин или email" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста введите ваш пароль!' }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="login__btn"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
