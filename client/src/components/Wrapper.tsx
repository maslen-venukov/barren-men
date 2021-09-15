import React, { useState } from 'react'
import { Switch, Redirect, RouteProps, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Operators from 'pages/Operators'
import Header from './Header'
import Navbar from './Navbar'
import useTypedSelector from 'hooks/useTypedSelector'
import { Role } from 'enums/Role'

const Wrapper: React.FC = () => {
  const { user } = useTypedSelector(state => state.auth)

  const [collapsed, setCollapsed] = useState(false)

  const routes: Record<Role, RouteProps & { path: string }[]> = {
    [Role.Admin]: [
      { exact: true, path: '/operators', component: Operators }
    ],
    [Role.Operator]: []
  }

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
            {user?.role === Role.Admin && routes[Role.Admin].map(route => <Route key={route.path} {...route} />)}
            <Redirect to="/" />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Wrapper
