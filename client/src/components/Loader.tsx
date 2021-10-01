import React from 'react'
import { Spin } from 'antd'

interface LoaderProps {
  size?: 'small' | 'large' | 'default'
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <div className="loader">
      <Spin size={size || 'default'} />
    </div>
  )
}

export default Loader
