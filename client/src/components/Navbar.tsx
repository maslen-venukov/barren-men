import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
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
      { path: '/operators', label: 'Операторы', icon: <UserOutlined /> }
    ],
    [Role.Operator]: []
  }

  return (
    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
      {user?.role === Role.Admin && menu[Role.Admin].map(item => (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}

    </Menu>
  )
}

export default Navbar
