import React from 'react'
import { Form, Input, Radio } from 'antd'
import validateNumber from 'utils/validateNumber'
import { Indicator as IndicatorInterface, IndicatorsTypeEnum } from 'store/types/indicators'

interface IndicatorWrapperProps {
  id: number,
  name: string,
  min?: number,
  max?: number,
  children: React.ReactNode
}

const IndicatorWrapper: React.FC<IndicatorWrapperProps> = ({
  id,
  name,
  min,
  max,
  children
}) => (
  <Form.Item
    key={id}
    label={name}
    name={id}
    required
    rules={[
      () => (
        min !== undefined && max !== undefined
          ? validateNumber(min, max)
          : { required: true, message: 'Пожалуйста заполните поле!' }
      )
    ]}
  >
    {children}
  </Form.Item>
)

const Indicator: React.FC<IndicatorInterface> = ({
  id,
  name,
  type,
  numberOptions,
  textOptions,
  booleanOptions
}) => {
  if(type === IndicatorsTypeEnum.Number && numberOptions) {
    return (
      <IndicatorWrapper
        id={id}
        name={name}
        min={numberOptions.min}
        max={numberOptions.max}
      >
        <Input
          placeholder={name}
          addonAfter={numberOptions.units}
        />
      </IndicatorWrapper>
    )
  }

  if(type === IndicatorsTypeEnum.Text && textOptions) {
    return (
      <IndicatorWrapper id={id} name={name}>
        <Input placeholder={name} />
      </IndicatorWrapper>
    )
  }

  if(type === IndicatorsTypeEnum.Boolean && booleanOptions) {
    return (
      <IndicatorWrapper id={id} name={name}>
        <Radio.Group>
          <Radio value={false}>нет</Radio>
          <Radio value={true}>есть</Radio>
        </Radio.Group>
      </IndicatorWrapper>
    )
  }

  return null
}

export default Indicator
