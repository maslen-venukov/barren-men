import React from 'react'
import { Button, DatePicker, Drawer, DrawerProps, Form, FormProps, InputNumber } from 'antd'
import moment, { Moment } from 'moment'
import IndicatorsFormItem from 'components/indicators/IndicatorsFormItem'
import { IndicatorsGroup } from 'store/types/indicatorsGroups'
import { Indicator as IndicatorInterface } from 'store/types/indicators'

export interface IndicatorsFormValues extends Record<number, number | string | boolean> {
  date: Moment
  stage: number
}

interface AnalysisDrawerProps extends DrawerProps, FormProps<IndicatorsFormValues> {
  title?: string
  submitText: string
  indicatorsGroup: IndicatorsGroup
  indicators: IndicatorInterface[]
}

const AnalysisDrawer: React.FC<AnalysisDrawerProps> = ({
  visible,
  form,
  submitText,
  indicatorsGroup,
  indicators,
  onClose,
  onFinish
}) => {
  return (
    <Drawer
      title={indicatorsGroup.name}
      visible={visible}
      onClose={onClose}
      width={400}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        validateTrigger="onBlur"
        autoComplete="off"
      >
        <Form.Item
          label="Дата анализа"
          name="date"
          rules={[
            { required: true, message: 'Пожалуйста введите дату анализу!' }
          ]}
        >
          <DatePicker
            disabledDate={(current: Moment) => current && current > moment()}
            format="DD.MM.YYYY"
          />
        </Form.Item>

        <Form.Item
          label="Номер этапа"
          name="stage"
          rules={[
            { required: true, message: 'Пожалуйста введите номер этапа!' }
          ]}
        >
          <InputNumber placeholder="Номер этапа" min={1} />
        </Form.Item>

        {indicators.map(indicator => (
          <IndicatorsFormItem key={indicator.id} {...indicator} />
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default AnalysisDrawer
