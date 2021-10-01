import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { SolutionOutlined, ContactsOutlined, IdcardOutlined } from '@ant-design/icons'
import { Role } from 'enums/Role'
import useTypedSelector from 'hooks/useTypedSelector'

interface MenuItem {
  path: string
  label: string
  icon: React.ReactNode
}

const Navbar: React.FC = () => {
  const { user } = useTypedSelector(state => state.auth)

  const location = useLocation()

  const menu: Record<Role, MenuItem[]> = {
    [Role.Admin]: [
      { path: '/operators', label: 'Операторы', icon: <SolutionOutlined /> },
      { path: '/patients-groups', label: 'Группы пациентов', icon: <ContactsOutlined /> }
    ],
    [Role.Operator]: [
      { path: '/patients', label: 'Пациенты', icon: <IdcardOutlined /> }
    ]
  }

  const allMenu = [...menu[Role.Admin], ...menu[Role.Operator]]

  const renderMenu = (role: Role, menu: MenuItem[]) => (
    user?.role === role && menu.map(item => (
      <Menu.Item key={item.path} icon={item.icon}>
        <Link to={item.path}>{item.label}</Link>
      </Menu.Item>
    ))
  )

  return (
    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
      {renderMenu(Role.Admin, allMenu)}
      {renderMenu(Role.Operator, menu[Role.Operator])}
    </Menu>
  )
}

export default Navbar
