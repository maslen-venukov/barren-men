import React from 'react'
import { Tooltip, Button, ButtonProps } from 'antd'

interface HintProps {
  title: string
  buttonProps: ButtonProps
}

const Hint: React.FC<HintProps> = ({ title, buttonProps }) => {
  return (
    <Tooltip title={title} destroyTooltipOnHide>
      <Button {...buttonProps} />
    </Tooltip>
  )
}

export default Hint
