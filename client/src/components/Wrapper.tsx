import React, { useState } from 'react'
import { Switch, Redirect, RouteProps, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Operators from 'pages/Operators'
import PatientsGroups from 'pages/PatientsGroups'
import Patients from 'pages/Patients'
import Patient from 'pages/Patient'
import Header from './Header'
import Navbar from './Navbar'
import useTypedSelector from 'hooks/useTypedSelector'
import { Role } from 'enums/Role'

interface Location {
  path: string
  component: React.FC
}

const Wrapper: React.FC = () => {
  const { user } = useTypedSelector(state => state.auth)

  const [collapsed, setCollapsed] = useState(false)

  const routes: Record<Role, Location[]> = {
    [Role.Admin]: [
      { path: '/operators', component: Operators },
      { path: '/patients-groups', component: PatientsGroups }
    ],
    [Role.Operator]: [
      { path: '/patients/:id', component: Patient },
      { path: '/patients', component: Patients }
    ]
  }

  const allRoutes = [...routes[Role.Admin], ...routes[Role.Operator]]

  const renderRoutes = (role: Role, routes: RouteProps & { path: string }[]) => (
    user?.role === role && routes.map(route => <Route key={route.path} {...route} exact />)
  )

  const onToggle = () => setCollapsed(!collapsed)

  return (
    <Layout className="layout">
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <Navbar />
      </Layout.Sider>
      <Layout>
        <Header collapsed={collapsed} onToggle={onToggle} />
        <Layout.Content className="content">
          <Switch>
            {renderRoutes(Role.Admin, allRoutes)}
            {renderRoutes(Role.Operator, routes[Role.Operator])}
            <Redirect to="/" />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Wrapper
