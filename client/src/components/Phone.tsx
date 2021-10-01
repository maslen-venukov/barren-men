import { Typography } from 'antd'
import React from 'react'

interface PhoneProps {
  phone: string
}

const Phone: React.FC<PhoneProps> = ({ phone }) => {
  return (
    <Typography.Link href={`tel:${phone.replace(/[^+\d]+/g, '')}`}>
      {phone}
    </Typography.Link>
  )
}

export default Phone
