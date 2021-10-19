import React from 'react'
import { AnalysisIndicator } from 'store/types/analyzes'
import { Indicator, IndicatorsTypeEnum } from 'store/types/indicators'

interface IndicatorsInfoProps extends AnalysisIndicator {
  indicator?: Indicator
}

const IndicatorsInfo: React.FC<IndicatorsInfoProps> = ({
  value,
  indicator
}) => {
  if(!indicator) {
    return null
  }

  if(indicator.type === IndicatorsTypeEnum.Number && indicator.numberOptions) {
    return (
      <div className="indicator-info">
        <span>{indicator.name}: {value} {indicator.numberOptions.units}</span>
        <span>Норма: {indicator.numberOptions.minNorm} – {indicator.numberOptions.maxNorm}</span>
      </div>
    )
  }

  if(indicator.type === IndicatorsTypeEnum.Text && indicator.textOptions) {
    return (
      <div className="indicator-info">
        <span>{indicator.name}: {value}</span>
        <span>Норма: {indicator.textOptions.norm}</span>
      </div>
    )
  }

  if(indicator.type === IndicatorsTypeEnum.Boolean && indicator.booleanOptions) {
    return (
      <div className="indicator-info">
        <span>{indicator.name}: {value === 'true' ? 'есть' : 'нет'}</span>
        <span>Норма: {indicator.booleanOptions.norm ? 'есть' : 'нет'}</span>
      </div>
    )
  }

  return <div>{indicator.name}: {value}</div>
}

export default IndicatorsInfo
