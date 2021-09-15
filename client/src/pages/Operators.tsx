import React, { useEffect } from 'react'
import { Table, Drawer, Form, Input, Button } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import Confirm from 'components/Confirm'
import Hint from 'components/Hint'
import useTypedDispatch from 'hooks/useTypedDispatch'
import useTypedSelector from 'hooks/useTypedSelector'
import useBoolean from 'hooks/useBoolean'
import { deleteUser, fetchUsers, postUser } from 'store/api/users'
import { setUsers } from 'store/slices/users'
import { User } from 'store/types/users'

interface FormValues {
  email: string
  lastName: string
  firstName: string
  patronymic: string
}

const Home: React.FC = () => {
  const dispatch = useTypedDispatch()

  const { users, loading } = useTypedSelector(state => state.users)

  const {
    value: drawerVisible,
    setTrue: onOpenDrawer,
    setFalse: onCloseDrawer
  } = useBoolean()

  const [form] = Form.useForm()

  const onCreate = (values: FormValues) => {
    dispatch(postUser(values))
    onCloseDrawer()
    form.resetFields()
  }

  const onRemove = (id: number) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    dispatch(fetchUsers())
    return () => {
      dispatch(setUsers([]))
    }
  }, [dispatch])

  return (
    <div className="operators">
      <Table
        dataSource={users}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
        bordered
        title={() => (
          <Hint
            title="Добавить"
            buttonProps={{
              onClick: onOpenDrawer,
              icon: <PlusOutlined />,
              type: 'primary'
            }}
          />
        )}
      >
        <Table.Column title="Логин" dataIndex="login" />
        <Table.Column title="Email" dataIndex="email" />
        <Table.Column title="Фамилия" dataIndex="lastName" />
        <Table.Column title="Имя" dataIndex="firstName" />
        <Table.Column title="Отчество" dataIndex="patronymic" />
        <Table.Column
          title="Действия"
          render={(record: User) => (
            <Confirm
              confirmTitle="Вы действительно хотите удалить оператора?"
              tooltipTitle="Удалить"
              onConfirm={() => onRemove(record.id)}
              buttonProps={{
                type: 'primary',
                danger: true,
                icon: <DeleteOutlined />
              }}
            />
          )}
        />
      </Table>

      <Drawer
        title="Добавить оператора"
        visible={drawerVisible}
        onClose={onCloseDrawer}
        width={400}
      >
        <Form
          form={form}
          onFinish={onCreate}
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
      </Drawer>
    </div>
  )
}

export default Home
