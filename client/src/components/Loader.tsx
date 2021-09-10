import React from 'react'
import { Spin } from 'antd'

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <Spin size="large" />
    </div>
  )
}

export default Loader
