/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  PieChartOutlined,
  UserOutlined,
  ProfileOutlined,
  HomeOutlined,
  PoweroffOutlined,
  PoundOutlined,
  SettingOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Menu,
  theme,
  Button,
  Tooltip,
} from 'antd';
import styles from './layout.module.css';
import { setAuthData, logOutUser } from '../../features/auth';

const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout;

const getItem = (label, key, icon, children) => ({
  key,
  icon,
  children,
  label,
});

const UserItems = [
  getItem('home', '1', <HomeOutlined />),
  getItem('profile', '2', <ProfileOutlined />),
  getItem('BIll', 'sub1', <PoundOutlined />, [getItem('Recharge', '6'), getItem('Payment', '7')]),
  getItem('Settings', '8', <SettingOutlined />),
];

const AdminItems = [
  getItem('home', '1', <HomeOutlined />),
  getItem('Statistics', '3', <PieChartOutlined />),
  getItem('Bill Management', 'sub2', <PoundOutlined />, [getItem('View Bills', '10'), getItem('EVC Code', '4'), getItem('Cost Control', '5')]),
  getItem('User Management', '9', <UserOutlined />),
  getItem('Settings', '8', <SettingOutlined />),

];
function MenuLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigationRoutes = {
    1: '/dashboard',
    2: '/dashboard/profile',
    3: '/dashboard/statistics',
    4: '/dashboard/billing/evc-code',
    5: '/dashboard/billing/access-control',
    6: '/dashboard/payment/recharge',
    7: '/dashboard/payment/add-bill',
    8: '/dashboard/settings',
    9: '/dashboard/user-management',
    10: '/dashboard/billing/list-bill',
  };
  const [collapsed, setCollapsed] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { isAdmin, dashboardSelectedKey } = auth;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChange = (e) => {
    dispatch(setAuthData('dashboardSelectedKey', [e.key]));
    navigate(navigationRoutes[e?.key]);
  };

  const handleLogOUt = () => {
    dispatch(logOutUser());
  };
  useEffect(() => {
    navigate(navigationRoutes[dashboardSelectedKey]);
  }, []);
  return (
    <div>
      <Layout className={styles.layoutMain}>
        <Sider
          breakpoint="md"
          collapsed={collapsed}
          collapsible
          trigger={null}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className={styles.layoutSecondary}>
            <p style={{ fontFamily: '-moz-initial' }}>
              {' '}
              {' '}
              <DeploymentUnitOutlined
                spin
                style={{ fontSize: 16 }}
              />
              IGSE
            </p>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={dashboardSelectedKey}
            items={isAdmin ? AdminItems : UserItems}
            mode="inline"
            onClick={handleChange}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, margin: 0, background: colorBgContainer }}>
            <div className={styles.logoutButton}>
              <Tooltip title="Log Out">
                <Button
                  shape="circle"
                  onClick={handleLogOUt}
                  icon={<PoweroffOutlined />}
                />
              </Tooltip>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }} className={styles.parent}>
            <Outlet />
          </Content>
          <Footer className={styles.footerUI}>
            <p className={styles.footerP}>IGSE Energy Tool © 2022</p>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default MenuLayout;
