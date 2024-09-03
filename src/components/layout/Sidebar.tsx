import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/AdminRoutes/AdminRoutes";
import { facultyPaths } from "../../routes/FacultyRoutes/FacultyRoutes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
const { Sider } = Layout;

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };
  const role = user?.role;
  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    // case userRole.ADMIN:
    //   sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
    //   break;

    default:
      break;
  }
  return (
    <Sider
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        PH-U
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
