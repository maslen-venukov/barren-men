import React from 'react'
import { Popconfirm, Tooltip, Button, ButtonProps } from 'antd'
import useBoolean from 'hooks/useBoolean'

interface ConfirmProps {
  confirmTitle: string
  tooltipTitle: string
  onConfirm: () => void
  buttonProps: ButtonProps
}

const Confirm: React.FC<ConfirmProps> = ({ confirmTitle, tooltipTitle, onConfirm, buttonProps }) => {
  const {
    value: popconfirmVisible,
    setValue: setPopconfirmVisible,
    setFalse: closePopconfirm
  } = useBoolean()

  const {
    value: tooltipVisible,
    setValue: setTooltipVisible,
    setFalse: closeTooltip
  } = useBoolean()

  return (
    <Popconfirm
      title={confirmTitle}
      onConfirm={() => {
        onConfirm()
        closePopconfirm()
      }}
      okText="Да"
      onCancel={closePopconfirm}
      cancelText="Нет"
      visible={popconfirmVisible}
      onVisibleChange={setPopconfirmVisible}
    >
      <Tooltip
        title={tooltipTitle}
        visible={tooltipVisible && !popconfirmVisible}
        onVisibleChange={setTooltipVisible}
      >
        <Button {...buttonProps} onClick={closeTooltip} />
      </Tooltip>
    </Popconfirm>
  )
}

export default Confirm
