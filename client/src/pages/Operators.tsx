import React, { useEffect } from 'react'
import { Table } from 'antd'
import useTypedDispatch from 'hooks/useTypedDispatch'
import useTypedSelector from 'hooks/useTypedSelector'
import { fetchUsers } from 'store/api/users'
import { setUsers } from 'store/slices/users'

const Home: React.FC = () => {
  const dispatch = useTypedDispatch()

  const { users, loading } = useTypedSelector(state => state.users)

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
      >
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="Логин" dataIndex="login" />
        <Table.Column title="Email" dataIndex="email" />
        <Table.Column title="Фамилия" dataIndex="lastName" />
        <Table.Column title="Имя" dataIndex="firstName" />
        <Table.Column title="Отчество" dataIndex="patronymic" />
      </Table>
    </div>
  )
}

export default Home
