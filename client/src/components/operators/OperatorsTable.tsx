import React from 'react'
import { Table, TableProps } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import Hint from 'components/Hint'
import Confirm from 'components/Confirm'
import { User } from 'store/types/users'

interface OperatorsTableProps extends TableProps<User> {
  onOpenDrawer: () => void
  onRemove: (id: number) => void
}

const OperatorsTable: React.FC<OperatorsTableProps> = ({
  dataSource,
  loading,
  onOpenDrawer,
  onRemove
}) => {
  return (
    <Table
      dataSource={dataSource}
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
  )
}

export default OperatorsTable
