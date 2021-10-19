import React from 'react'
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  DrawerProps,
  FormProps
} from 'antd'

export interface PatientsGroupFormValues {
  number: number
  description: string
}

interface PatientsGroupDrawerProps extends DrawerProps, FormProps<PatientsGroupFormValues> {
  title: string
  submitText: string
}

const PatientsGroupDrawer: React.FC<PatientsGroupDrawerProps> = ({
  title,
  visible,
  form,
  submitText,
  onClose,
  onFinish
}) => {
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
          label="Номер"
          name="number"
          rules={[
            { required: true, message: 'Пожалуйста введите номер!' }
          ]}
        >
          <InputNumber placeholder="Номер" min={1} />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Пожалуйста введите описание!' }]}
        >
          <Input.TextArea placeholder="Описание" />
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

export default PatientsGroupDrawer
