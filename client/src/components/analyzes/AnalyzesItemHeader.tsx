import React from 'react'
import { Space, Typography, Badge } from 'antd'

interface AnalyzesItemHeaderProps {
  count: number
  name: string
}

const AnalyzesItemHeader: React.FC<AnalyzesItemHeaderProps> = ({
  count,
  name
}) => {
  return (
    <Space>
      <Typography.Text disabled={!count}>{name}</Typography.Text>
      <Badge count={count} />
    </Space>
  )
}

export default AnalyzesItemHeader
