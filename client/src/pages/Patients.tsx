import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Tabs, Typography, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import PatientsTable from 'components/patients/PatientsTable'
import Hint from 'components/Hint'
import Loader from 'components/Loader'
import PatientsDrawer, { PatientsFormValues } from 'components/patients/PatientsDrawer'
import useTypedDispatch from 'hooks/useTypedDispatch'
import useTypedSelector from 'hooks/useTypedSelector'
import useBoolean from 'hooks/useBoolean'
import { fetchPatients, postPatient, patchPatient, deletePatient } from 'store/api/patients'
import { setPatients } from 'store/slices/patients'
import { Patient } from 'store/types/patients'

const Patients: React.FC = () => {
  const dispatch = useTypedDispatch()

  const { patients, loading } = useTypedSelector(state => state.patients)

  const history = useHistory()

  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()

  const [activeTabKey, setActiveTabKey] = useState("0")
  const [patient, setPatient] = useState<Patient | null>(null)

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

  useEffect(() => {
    dispatch(fetchPatients())
    return () => {
      dispatch(setPatients([]))
    }
  }, [dispatch])

  useEffect(() => {
    editForm.setFieldsValue(patient ? {
      ...patient,
      birthDate: moment(patient.birthDate),
      infertilityDate: moment(patient.infertilityDate)
    } : {})
  }, [editForm, patient])

  const getFormData = (values: PatientsFormValues) => ({
    ...values,
    birthDate: values.birthDate.toDate(),
    infertilityDate: values.infertilityDate.toDate()
  })

  const onCreate = (values: PatientsFormValues) => {
    dispatch(postPatient(getFormData(values)))
    onCloseCreateDrawer()
    createForm.resetFields()
  }

  const onEdit = (values: PatientsFormValues) => {
    if(!patient) {
      return
    }
    dispatch(patchPatient(patient.id, getFormData(values)))
    onCloseEditDrawer()
    editForm.resetFields()
    setPatient(null)
  }

  const onRemove = (id: number) => dispatch(deletePatient(id))

  const onDetailsBtnClick = (id: number) => history.push(`/patients/${id}`)

  const onEditBtnClick = (patient: Patient) => {
    onOpenEditDrawer()
    setPatient(patient)
  }

  if(loading) {
    return <Loader />
  }

  return (
    <>
      <Hint
        title="Добавить"
        buttonProps={{
          onClick: onOpenCreateDrawer,
          icon: <PlusOutlined />,
          type: 'primary'
        }}
      />

      <Tabs defaultActiveKey={activeTabKey} onChange={setActiveTabKey}>
        {patients.map((group, index) => (
          <Tabs.TabPane tab={`Группа №${group.number}`} key={index}>
            <Typography.Paragraph>{group.description}</Typography.Paragraph>

            <PatientsTable
              dataSource={group.patients}
              loading={loading}
              onRemove={onRemove}
              onEditBtnClick={onEditBtnClick}
              onDetailsBtnClick={onDetailsBtnClick}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>

      <PatientsDrawer
        title="Добавить пациента"
        submitText="Добавить"
        visible={createDrawerVisible}
        form={createForm}
        onFinish={onCreate}
        onClose={onCloseCreateDrawer}
      />

      <PatientsDrawer
        title="Редактировать пациента"
        submitText="Редактировать"
        visible={editDrawerVisible}
        form={editForm}
        onFinish={onEdit}
        onClose={onCloseEditDrawer}
      />
    </>
  )
}

export default Patients
