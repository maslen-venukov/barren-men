import React, { useState, useEffect } from 'react'
import { Form } from 'antd'
import PatientsGroupDrawer, { PatientsGroupFormValues } from 'components/patientsGroups/PatientsGroupsDrawer'
import useTypedDispatch from 'hooks/useTypedDispatch'
import PatientsGroupsTable from 'components/patientsGroups/PatientsGroupsTable'
import useTypedSelector from 'hooks/useTypedSelector'
import useBoolean from 'hooks/useBoolean'
import { fetchPatientsGroups, deletePatientsGroup, postPatientsGroup, patchPatientsGroup } from 'store/api/patientsGroups'
import { setPatientsGroups } from 'store/slices/patientsGroups'
import { PatientsGroup } from 'store/types/patientsGroups'

const PatientsGroups: React.FC = () => {
  const dispatch = useTypedDispatch()

  const { patientsGroups, loading } = useTypedSelector(state => state.patientsGroups)

  const [patientsGroup, setPatientsGroup] = useState<PatientsGroup | null>(null)

  const {
    value: createDrawerVisible,
    setTrue: onOpenCreateDrawer,
    setFalse: onCloseCreateDrawer
  } = useBoolean()

  const {
    value: editDrawerVisible,
    setTrue: onOpenEditDrawer,
    setFalse: onCloseEditDrawer
  } = useBoolean()

  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()

  useEffect(() => {
    dispatch(fetchPatientsGroups())
    return () => {
      dispatch(setPatientsGroups([]))
    }
  }, [dispatch])

  useEffect(() => {
    editForm.setFieldsValue(patientsGroup)
  }, [editForm, patientsGroup])

  const onCreate = (values: PatientsGroupFormValues) => {
    dispatch(postPatientsGroup(values))
    onCloseCreateDrawer()
    createForm.resetFields()
  }

  const onEdit = (values: PatientsGroupFormValues) => {
    if(!patientsGroup) {
      return
    }
    dispatch(patchPatientsGroup(patientsGroup.id, values))
    onCloseEditDrawer()
    editForm.resetFields()
    setPatientsGroup(null)
  }

  const onRemove = (id: number) => dispatch(deletePatientsGroup(id))

  const onEditBtnClick = (patientsGroup: PatientsGroup) => {
    onOpenEditDrawer()
    setPatientsGroup(patientsGroup)
  }

  return (
    <>
      <PatientsGroupsTable
        dataSource={patientsGroups}
        loading={loading}
        onOpenCreateDrawer={onOpenCreateDrawer}
        onRemove={onRemove}
        onEditBtnClick={onEditBtnClick}
      />

      <PatientsGroupDrawer
        title="Добавить группу пациентов"
        submitText="Добавить"
        visible={createDrawerVisible}
        form={createForm}
        onFinish={onCreate}
        onClose={onCloseCreateDrawer}
      />

      <PatientsGroupDrawer
        title="Редактировать группу пациентов"
        submitText="Редактировать"
        visible={editDrawerVisible}
        form={editForm}
        onFinish={onEdit}
        onClose={onCloseEditDrawer}
      />
    </>
  )
}

export default PatientsGroups
