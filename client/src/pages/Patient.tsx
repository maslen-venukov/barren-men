import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Form, Typography, Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import Loader from 'components/Loader'
import Hint from 'components/Hint'
import AnalysisDrawer, { IndicatorsFormValues } from 'components/analyzes/AnalysisDrawer'
import PatientsDrawer, { PatientsFormValues } from 'components/patients/PatientsDrawer'
import PatientsInfo from 'components/patients/PatientsInfo'
import AnalyzesTabs from 'components/analyzes/AnalyzesTabs'
import useTypedDispatch from 'hooks/useTypedDispatch'
import useTypedSelector from 'hooks/useTypedSelector'
import useBoolean from 'hooks/useBoolean'
import { fetchPatient, patchCurrentPatient } from 'store/api/patients'
import { fetchIndicators } from 'store/api/indicators'
import { fetchIndicatorsGroups } from 'store/api/indicatorsGroups'
import { fetchAnalyzes, patchAnalysis, postAnalysis } from 'store/api/analyzes'
import { setCurrentPatient } from 'store/slices/patients'
import { setIndicators } from 'store/slices/indicators'
import { setIndicatorsGroups } from 'store/slices/indicatorsGroups'
import { setAnalyzes } from 'store/slices/analyzes'
import { IndicatorsGroup } from 'store/types/indicatorsGroups'
import { Analysis, CreateAnalysisIndicator } from 'store/types/analyzes'
import AnalyzesItemHeader from 'components/analyzes/AnalyzesItemHeader'

// TODO edit analyze

interface PatientParams {
  id: string
}

const Patient: React.FC = () => {
  const dispatch = useTypedDispatch()

  const { currentPatient, loading: patientsLoading } = useTypedSelector(state => state.patients)
  const { indicatorsGroups, loading: indicatorsGroupsLoading } = useTypedSelector(state => state.indicatorsGroups)
  const { indicators, loading: indicatorsLoading } = useTypedSelector(state => state.indicators)
  const { analyzes, loading: analyzesLoading } = useTypedSelector(state => state.analyzes)

  const { id } = useParams<PatientParams>()

  const [createAnalysisForm] = Form.useForm()
  const [editAnalysisForm] = Form.useForm()
  const [editPatientForm] = Form.useForm()

  const {
    value: createAnalysisDrawerVisible,
    setTrue: onOpenCreateAnalysisDrawer,
    setFalse: onCloseCreateAnalysisDrawer
  } = useBoolean()

  const {
    value: editAnalysisDrawerVisible,
    setTrue: onOpenEditAnalysisDrawer,
    setFalse: onCloseEditAnalysisDrawer
  } = useBoolean()

  const {
    value: editPatientDrawerVisible,
    setTrue: onOpenEditPatientDrawer,
    setFalse: onCloseEditPatientDrawer
  } = useBoolean()

  const [indicatorsGroup, setIndicatorsGroup] = useState<IndicatorsGroup | null>(null)
  const [activeTabKeys, setActiveTabKeys] = useState<Record<number, number | undefined>>({})
  const [analysis, setAnalysis] = useState<Analysis | null>(null)

  useEffect(() => {
    dispatch(fetchPatient(Number(id)))
    return () => {
      dispatch(setCurrentPatient(null))
      dispatch(setIndicatorsGroups([]))
      dispatch(setIndicators([]))
      dispatch(setAnalyzes([]))
    }
  }, [dispatch, id])

  useEffect(() => {
    if(currentPatient) {
      dispatch(fetchIndicatorsGroups())
      dispatch(fetchIndicators())
      dispatch(fetchAnalyzes(currentPatient.id))
    }
  }, [dispatch, currentPatient])

  useEffect(() => {
    const keys = analyzes.reduce((acc: Record<number, number | undefined>, el) => {
      const firstInGroup = analyzes.find(analysis => analysis.groupId === el.groupId)
      return {
        ...acc,
        [el.groupId]: firstInGroup?.id
      }
    }, {})

    setActiveTabKeys(keys)
  }, [analyzes])

  useEffect(() => {
    setIndicatorsGroup(indicatorsGroups.length ? indicatorsGroups[0] : null)
  }, [indicatorsGroups])

  useEffect(() => {
    setTimeout(() => {
      const formData = currentPatient ? {
        ...currentPatient,
        birthDate: moment(currentPatient.birthDate),
        infertilityDate: moment(currentPatient.infertilityDate)
      } : {}

      editPatientForm.setFieldsValue(formData)
    }, editPatientDrawerVisible ? 0 : 300)
  }, [editPatientForm, currentPatient, editPatientDrawerVisible])

  useEffect(() => {
    if(!analysis) {
      return
    }

    setTimeout(() => {
      const indicatorsFormValues = analysis.indicators.reduce((acc, indicator) => ({
        ...acc,
        [indicator.indicatorId]: getIndicatorValue(indicator.value)
      }), {})

      const formData = {
        ...indicatorsFormValues,
        date: moment(analysis.date),
        stage: analysis.stage
      }

      editAnalysisForm.setFieldsValue(formData)
    }, editAnalysisDrawerVisible ? 0 : 300)
  }, [analysis, editAnalysisForm, editAnalysisDrawerVisible])

  const getIndicatorsFormData = (values: IndicatorsFormValues) => {
    const indicators = Object.entries(values)
      .reduce((acc: CreateAnalysisIndicator[], [key, value]) => (
        ['date', 'stage'].includes(key)
          ? acc
          : [...acc, { indicatorId: Number(key), value: value.toString() }]
      ), [])

    return {
      indicators,
      date: values.date.toDate(),
      stage: values.stage,
      patientId: Number(id)
    }
  }

  const getPatientsFormData = (values: PatientsFormValues) => ({
    ...values,
    birthDate: values.birthDate.toDate(),
    infertilityDate: values.infertilityDate.toDate()
  })

  const onChangeActiveKey = (groupId: number, activeKey?: string) => {
    setActiveTabKeys({
      ...activeTabKeys,
      [groupId]: activeKey ? Number(activeKey) : undefined
    })
  }

  const filterArrByGroup = <T extends { groupId: number }>(
    arr: T[],
    groupId: number
  ) => arr.filter(el => el.groupId === groupId)

  const getAnalyzesByGroup = (groupId: number) => filterArrByGroup(analyzes, groupId)
  const getIndicatorsByGroup = (groupId: number) => filterArrByGroup(indicators, groupId)

  const onCreateAnalysis = (values: IndicatorsFormValues) => {
    const data = getIndicatorsFormData(values)
    dispatch(postAnalysis(data))
      .then(({ groupId, id }) => onChangeActiveKey(groupId, id.toString()))
    onCloseCreateAnalysisDrawer()
    setTimeout(createAnalysisForm.resetFields, 300)
  }

  const onEditAnalysis = (values: IndicatorsFormValues) => {
    if(!analysis) {
      return
    }

    const data = {
      ...getIndicatorsFormData(values),
      patientId: undefined,
      analysisId: analysis.id
    }

    dispatch(patchAnalysis(analysis.id, data))
      .then(({ groupId, id }) => onChangeActiveKey(groupId, id.toString()))
    onCloseEditAnalysisDrawer()
  }

  const onEditPatient = (values: PatientsFormValues) => {
    dispatch(patchCurrentPatient(Number(id), getPatientsFormData(values)))
    onCloseEditPatientDrawer()
  }

  const onAddAnalysisBtnClick = (e: React.MouseEvent, group: IndicatorsGroup) => {
    e.stopPropagation()
    setIndicatorsGroup(group)
    onOpenCreateAnalysisDrawer()
  }

  const getIndicatorValue = (value: string) => {
    switch(value) {
      case 'false':
        return false

      case 'true':
        return true

      default:
        return value
    }
  }

  const onEditAnalysisBtnClick = (analysis: Analysis, group: IndicatorsGroup) => {
    setAnalysis(analysis)
    setIndicatorsGroup(group)
    onOpenEditAnalysisDrawer()
  }

  if(patientsLoading || indicatorsLoading || indicatorsGroupsLoading || analyzesLoading) {
    return <Loader />
  }

  if(!currentPatient) {
    return <Typography.Paragraph>Пациент не найден</Typography.Paragraph>
  }

  return (
    <div className="patient">
      <PatientsInfo
        patient={currentPatient}
        onEditBtnClick={onOpenEditPatientDrawer}
      />

      <Collapse>
        {indicatorsGroups.map(group => (
          <Collapse.Panel
            key={group.id}
            collapsible={getAnalyzesByGroup(group.id).length ? undefined : 'disabled'}
            header={(
              <AnalyzesItemHeader
                name={group.name}
                count={getAnalyzesByGroup(group.id).length}
              />
            )}
            extra={(
              <Hint
                title="Добавить"
                buttonProps={{
                  type: 'primary',
                  size: 'small',
                  icon: <PlusOutlined />,
                  onClick: e => onAddAnalysisBtnClick(e, group)
                }}
              />
            )}
          >
            <AnalyzesTabs
              analyzes={getAnalyzesByGroup(group.id)}
              activeKey={activeTabKeys[group.id]}
              onChangeActiveKey={activeKey => onChangeActiveKey(group.id, activeKey)}
              onEditBtnClick={analysis => onEditAnalysisBtnClick(analysis, group)}
            />
          </Collapse.Panel>
        ))}
      </Collapse>

      <PatientsDrawer
        title="Редактировать пациента"
        submitText="Редактировать"
        visible={editPatientDrawerVisible}
        form={editPatientForm}
        onFinish={onEditPatient}
        onClose={onCloseEditPatientDrawer}
      />

      {indicatorsGroup && <>
        <AnalysisDrawer
          submitText="Добавить"
          visible={createAnalysisDrawerVisible}
          form={createAnalysisForm}
          indicatorsGroup={indicatorsGroup}
          indicators={getIndicatorsByGroup(indicatorsGroup.id)}
          onFinish={onCreateAnalysis}
          onClose={onCloseCreateAnalysisDrawer}
        />

        <AnalysisDrawer
          submitText="Редактировать"
          visible={editAnalysisDrawerVisible}
          form={editAnalysisForm}
          indicatorsGroup={indicatorsGroup}
          indicators={getIndicatorsByGroup(indicatorsGroup.id)}
          onFinish={onEditAnalysis}
          onClose={onCloseEditAnalysisDrawer}
        />
      </>}
    </div>
  )
}

export default Patient
