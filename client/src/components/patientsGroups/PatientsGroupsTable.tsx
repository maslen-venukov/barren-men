import React from 'react'
import { Space, Table, TableProps } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Hint from 'components/Hint'
import Confirm from 'components/Confirm'
import { PatientsGroup } from 'store/types/patientsGroups'

interface PatientsGroupsTableProps extends TableProps<PatientsGroup> {
  onOpenCreateDrawer: () => void,
  onRemove: (id: number) => void,
  onEditBtnClick: (patientsGroup: PatientsGroup) => void
}

const PatientsGroupsTable: React.FC<PatientsGroupsTableProps> = ({
  dataSource,
  loading,
  onOpenCreateDrawer,
  onRemove,
  onEditBtnClick
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
            onClick: onOpenCreateDrawer,
            icon: <PlusOutlined />,
            type: 'primary'
          }}
        />
      )}
    >
      <Table.Column title="Номер" dataIndex="number" />
      <Table.Column title="Описание" dataIndex="description" />
      <Table.Column
        title="Действия"
        render={(record: Omit<PatientsGroup, 'patients'>) => (
          <Space>
            <Confirm
              confirmTitle="Вы действительно хотите удалить группу?"
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
          </Space>
        )}
      />
    </Table>
  )
}

export default PatientsGroupsTable
