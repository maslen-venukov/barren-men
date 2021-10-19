import React from 'react'
import { Descriptions, Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Hint from 'components/Hint'
import Phone from 'components/Phone'
import getFullName from 'utils/getFullName'
import formatDate from 'utils/formatDate'
import { CurrentPatient } from 'store/types/patients'

interface PatientsInfoProps {
  patient: CurrentPatient
  onEditBtnClick: () => void
}

const PatientsInfo: React.FC<PatientsInfoProps> = ({
  patient,
  onEditBtnClick
}) => {
  return (
    <Descriptions
      title={<>
        {getFullName(patient, false)} – <Tooltip title={patient.group.description}>Группа №{patient.group.number}</Tooltip>
      </>}
      extra={
        <Hint
          title="Редактировать"
          buttonProps={{
            onClick: onEditBtnClick,
            icon: <EditOutlined />,
            type: 'primary'
          }}
        />
      }
      style={{ marginBottom: 16 }}
    >
      <Descriptions.Item label="Дата рождения">
        {formatDate(patient.birthDate)}
      </Descriptions.Item>

      <Descriptions.Item label="Дата постановки диагноза бесплодия" span={2}>
        {formatDate(patient.infertilityDate)}
      </Descriptions.Item>

      <Descriptions.Item label="Номер телефона">
        <Phone phone={patient.phone} />
      </Descriptions.Item>

      <Descriptions.Item label="Адрес" span={2}>
        {patient.address}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default PatientsInfo
