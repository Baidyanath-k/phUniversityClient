import { Table } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/semesterRegistration.api";
import AddFacultyModal from "./AddFacultyModal";

const AllCourses = () => {
  const { data: allCourses, isFetching } = useGetAllCoursesQuery(undefined);

  const allCoursesTableDataOptions = allCourses?.data.map(
    ({ _id, title, prefix, code, credits }) => ({
      key: _id,
      title,
      prefix,
      code,
      credits,
    })
  );

  const columns = [
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Course prefix",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "Course Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        return <AddFacultyModal item={item} />;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      loading={isFetching}
      dataSource={allCoursesTableDataOptions}
    />
  );
};

// const addFacultyModal = () =>{
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const showModal = () => {
//       setIsModalOpen(true);
//     };

//     const handleOk = () => {
//       setIsModalOpen(false);
//     };

//     const handleCancel = () => {
//       setIsModalOpen(false);
//     };

//     return (
//       <>
//         <Button type="primary" onClick={showModal}>
//           Open Modal
//         </Button>
//         <Modal
//           title="Basic Modal"
//           open={isModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//         >
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//         </Modal>
//       </>
//     );
// }

export default AllCourses;
