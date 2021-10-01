import React from 'react'
import { Drawer, Form, DrawerProps, FormProps, Button, Input, DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import NumberFormat from 'react-number-format'
import validatePhone from 'utils/validatePhone'

export interface PatientsFormValues {
  lastName: string
  firstName: string
  patronymic: string
  birthDate: Moment
  infertilityDate: Moment
  phone: string
  address: string
}

interface PatientsDrawerProps extends DrawerProps, FormProps {
  title: string
  submitText: string
  onFinish: (values: PatientsFormValues) => void
}

const PatientsDrawer: React.FC<PatientsDrawerProps> = ({
  title,
  visible,
  form,
  submitText,
  onClose,
  onFinish
}) => {
  const datePickerProps = {
    disabledDate: (current: Moment) => current && current > moment(),
    format: 'DD.MM.YYYY'
  }

  return (
    <Drawer
      title={title}
      visible={visible}
      onClose={onClose}
      width={400}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        validateTrigger="onBlur"
        autoComplete="off"
      >
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[
            { required: true, message: 'Пожалуйста введите фамилия!' }
          ]}
        >
          <Input placeholder="Фамилия" />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="firstName"
          rules={[
            { required: true, message: 'Пожалуйста введите имя!' }
          ]}
        >
          <Input placeholder="Имя" />
        </Form.Item>

        <Form.Item
          label="Отчество"
          name="patronymic"
          rules={[
            { required: true, message: 'Пожалуйста введите отчество!' }
          ]}
        >
          <Input placeholder="Отчество" />
        </Form.Item>

        <Form.Item
          label="Дата рождения"
          name="birthDate"
          rules={[
            { required: true, message: 'Пожалуйста введите дату рождения!' }
          ]}
        >
            <DatePicker {...datePickerProps} />
        </Form.Item>

        <Form.Item
          label="Дата постановки диагноза бесплодия"
          name="infertilityDate"
          rules={[
            { required: true, message: 'Пожалуйста введите дату постановки диагноза бесплодия!' }
          ]}
        >
          <DatePicker {...datePickerProps} />
        </Form.Item>

        <Form.Item
          label="Номер телефона"
          name="phone"
          rules={[validatePhone]}
        >
          <NumberFormat
            customInput={Input}
            placeholder="Номер телефона"
            format="+7 (###) ###-##-##"
            mask="_"
          />
        </Form.Item>

        <Form.Item
          label="Адрес проживания"
          name="address"
          rules={[
            { required: true, message: 'Пожалуйста введите адрес проживания!' }
          ]}
        >
          <Input placeholder="Адрес проживания" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default PatientsDrawer
