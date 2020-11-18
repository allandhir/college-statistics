import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import "../assets/scss/menu-layout.scss";
const { Header, Sider, Content, Footer } = Layout;

const admin = [
  {
    link: "/",
    icon: HomeOutlined,
    text: "Home",
  },
  {
    link: "/dashboard",
    icon: DashboardOutlined,
    text: "Dashboard",
  },
];

function renderMenus(source) {
  return source.map((menu, i) => {
    return (
      <Menu.Item
        key={menu.link}
        icon={<menu.icon style={{ verticalAlign: "middle" }} />}
      >
        <span style={{ verticalAlign: "middle" }}>{menu.text}</span>
      </Menu.Item>
    );
  });
}

function ThreePartLayout({ children, layout }) {
  let source = admin;
  const location = useLocation();
  const history = useHistory();
  const [collapse, setCollapse] = useState(true);

  return (
    <Layout className="ThreePartLayout">
      {/* TODO: Collapse Sider by default on smaller breakpoint */}
      <Sider collapsible collapsed={collapse} trigger={null} theme="dark">
        <div className="logo" />
        {/* TODO: Change menu selected based on current Url (handle nested routing) */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onSelect={({ key }) => history.push(key)}
          theme="dark"
        >
          {renderMenus(source)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            { collapse } ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapse((prevState) => !prevState),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "35px 35px",
            minHeight: "calc(100vh - 64px - 70px - 70px)", // 64px -> header, 70px -> footer, 35px 35px -> margin
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>OneShot ©2020</Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(ThreePartLayout);
