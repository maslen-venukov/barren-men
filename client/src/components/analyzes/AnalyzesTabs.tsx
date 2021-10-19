import React from 'react'
import { Space, Tabs, Typography, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import IndicatorsInfo from 'components/indicators/IndicatorsInfo'
import Confirm from 'components/Confirm'
import Hint from 'components/Hint'
import useTypedDispatch from 'hooks/useTypedDispatch'
import useTypedSelector from 'hooks/useTypedSelector'
import { deleteAnalysis } from 'store/api/analyzes'
import formatDate from 'utils/formatDate'
import { Analysis } from 'store/types/analyzes'

interface AnalyzesTabsProps {
  analyzes: Analysis[]
  activeKey: number | undefined
  onChangeActiveKey: (activeKey?: string) => void
  onEditBtnClick: (analysis: Analysis) => void
}

const AnalyzesTabs: React.FC<AnalyzesTabsProps> = ({
  analyzes,
  activeKey,
  onChangeActiveKey,
  onEditBtnClick
}) => {
  const dispatch = useTypedDispatch()

  const { indicators } = useTypedSelector(state => state.indicators)

  const onDelete = (id: number) => dispatch(deleteAnalysis(id))

  return (
    <Tabs
      activeKey={activeKey ? activeKey.toString() : undefined}
      onChange={onChangeActiveKey}
    >
      {analyzes.map(analysis => (
        <Tabs.TabPane
          key={analysis.id}
          tab={(
            <Space>
              <Typography.Link>Этап {analysis.stage} – {formatDate(analysis.date)}</Typography.Link>

              {activeKey === analysis.id && <>
                <Confirm
                  confirmTitle="Вы действительно хотите удалить анализ?"
                  tooltipTitle="Удалить"
                  onConfirm={() => onDelete(analysis.id)}
                  buttonProps={{
                    type: 'primary',
                    size: 'small',
                    danger: true,
                    icon: <DeleteOutlined />
                  }}
                />

                <Hint
                  title="Редактировать"
                  buttonProps={{
                    type: 'primary',
                    size: 'small',
                    icon: <EditOutlined />,
                    onClick: () => onEditBtnClick(analysis)
                  }}
                />
              </>}
            </Space>
          )}
        >
          <List
            className="analyzes-list"
            size="small"
            dataSource={analysis.indicators}
            renderItem={indicator => (
              <List.Item key={indicator.id}>
                <IndicatorsInfo
                  indicator={indicators.find(el => el.id === indicator.indicatorId)}
                  {...indicator}
                />
              </List.Item>
            )}
          />
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export default AnalyzesTabs
