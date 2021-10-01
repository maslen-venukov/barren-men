import React, { useEffect } from 'react'
import { Drawer, Form } from 'antd'
import OperatorsTable from 'components/operators/OperatorsTable'
import useTypedDispatch from 'hooks/useTypedDispatch'
import useTypedSelector from 'hooks/useTypedSelector'
import useBoolean from 'hooks/useBoolean'
import { deleteUser, fetchUsers, postUser } from 'store/api/users'
import { setUsers } from 'store/slices/users'
import OperatorsForm, { OperatorsFormValues } from 'components/operators/OperatorsForm'

// TODO мб переписать drawer на suspense

const Operators: React.FC = () => {
  const dispatch = useTypedDispatch()

  const { users, loading } = useTypedSelector(state => state.users)

  const {
    value: drawerVisible,
    setTrue: onOpenDrawer,
    setFalse: onCloseDrawer
  } = useBoolean()

  const [form] = Form.useForm()

  const onCreate = (values: OperatorsFormValues) => {
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
    <>
      <OperatorsTable
        dataSource={users}
        loading={loading}
        onOpenDrawer={onOpenDrawer}
        onRemove={onRemove}
      />

      <Drawer
        title="Добавить оператора"
        visible={drawerVisible}
        onClose={onCloseDrawer}
        width={400}
      >
        <OperatorsForm
          form={form}
          onFinish={onCreate}
        />
      </Drawer>
    </>
  )
}

export default Operators
