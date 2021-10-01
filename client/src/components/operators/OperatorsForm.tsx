import React from 'react'
import { Form, Input, Button, FormProps } from 'antd'

export interface OperatorsFormValues {
  email: string
  lastName: string
  firstName: string
  patronymic: string
}

interface OperatorsFormProps extends FormProps {
  onFinish: (values: OperatorsFormValues) => void
}

const OperatorsForm: React.FC<OperatorsFormProps> = ({
  form,
  onFinish
}) => {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      validateTrigger="onBlur"
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { type: 'email', message: 'Некорректный email!' },
          { required: true, message: 'Пожалуйста введите email!' }
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        label="Фамилия"
        name="lastName"
        rules={[{ required: true, message: 'Пожалуйста введите фамилию!' }]}
      >
        <Input placeholder="Фамилия" />
      </Form.Item>

      <Form.Item
        label="Имя"
        name="firstName"
        rules={[{ required: true, message: 'Пожалуйста введите имя!' }]}
      >
        <Input placeholder="Имя" />
      </Form.Item>

      <Form.Item
        label="Отчество"
        name="patronymic"
        rules={[{ required: true, message: 'Пожалуйста введите отчество!' }]}
      >
        <Input placeholder="Отчество" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default OperatorsForm
