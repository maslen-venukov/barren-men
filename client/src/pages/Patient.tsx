import React from 'react'
import { useParams } from 'react-router'

const Patient: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // TODO сделать страницу пациента, когда будут готовы показатели
  return <>
    {id}
  </>
}

export default Patient
