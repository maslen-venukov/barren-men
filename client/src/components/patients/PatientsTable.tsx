import React from 'react'
import { Space, Table, TableProps } from 'antd'
import { DeleteOutlined, EditOutlined, InfoOutlined } from '@ant-design/icons'
import Phone from 'components/Phone'
import Hint from 'components/Hint'
import Confirm from 'components/Confirm'
import { Patient } from 'store/types/patients'
import getFullName from 'utils/getFullName'
import formatDate from 'utils/formatDate'

interface PatientsTableProps extends TableProps<Patient> {
  onRemove: (id: number) => void,
  onEditBtnClick: (patient: Patient) => void,
  onDetailsBtnClick: (id: number) => void
}

const PatientsTable: React.FC<PatientsTableProps> = ({
  dataSource,
  loading,
  onRemove,
  onEditBtnClick,
  onDetailsBtnClick
}) => {
  return (
    <Table
      dataSource={dataSource}
      loading={loading}
      rowKey={record => record.id}
      pagination={false}
      bordered
    >
      <Table.Column title="ФИО" render={(_, record: Patient) => getFullName(record)} />
      <Table.Column title="Дата рождения" dataIndex="birthDate" render={formatDate} />
      <Table.Column title="Дата постановки диагноза бесплодия" dataIndex="infertilityDate" render={formatDate} />
      <Table.Column title="Номер телефона" dataIndex="phone" render={value => <Phone phone={value} />} />
      <Table.Column title="Адрес проживания" dataIndex="address" />
      <Table.Column
        title="Действия"
        render={(record: Patient) => (
          <Space>
            <Confirm
              confirmTitle="Вы действительно хотите удалить пациента?"
              tooltipTitle="Удалить"
              onConfirm={() => onRemove(record.id)}
              buttonProps={{
                type: 'primary',
                danger: true,
                icon: <DeleteOutlined />
              }}
            />

            <Hint
              title="Редактировать"
              buttonProps={{
                onClick: () => onEditBtnClick(record),
                type: 'primary',
                icon: <EditOutlined />
              }}
            />

            <Hint
              title="Подробнее"
              buttonProps={{
                onClick: () => onDetailsBtnClick(record.id),
                shape: 'circle',
                icon: <InfoOutlined />
              }}
            />
          </Space>
        )}
      />
    </Table>
  )
}

export default PatientsTable
