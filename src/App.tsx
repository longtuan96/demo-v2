import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { Layout, Menu, TreeSelect } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  ToolOutlined,
  UngroupOutlined,
} from '@ant-design/icons';
import { Weather } from './features/weather/Weather';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TreeNode } from 'antd/lib/tree-select';
import { selectSetting, Setting, updateSetting } from './features/weather/WeatherSlice';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [unit, setUnit] = useState<string>('metric');
  const SettingData = useAppSelector(selectSetting);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onChangeUnit = (e: string) => {
    setUnit(e);
    dispatch(updateSetting({ ...SettingData, unit: e }));
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} collapsedWidth={0}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UngroupOutlined />}>
              <TreeSelect
                defaultValue={'metric'}
                style={{ width: '100%' }}
                value={unit}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChangeUnit}
              >
                <TreeNode value="standard" title="standard" />
                <TreeNode value="metric" title="metric" />
                <TreeNode value="imperial" title="imperial" />
              </TreeSelect>
            </Menu.Item>
            <SubMenu key="sub1" icon={<ToolOutlined />} title="Details">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Weather />
        </Layout>
      </Layout>
    </>
  );
}

export default App;
