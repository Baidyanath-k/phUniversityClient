import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

interface DataType {
  key: React.Key;
  name: string;
  code: number;
  year: string;
  startTMonth: string;
  endTMonth: string;
}

const AcademicSemester = () => {
  const { data: semesterData } = useGetAllAcademicSemestersQuery(undefined);
  console.log(semesterData?.data);

  const tableData = semesterData?.data.map((item) => ({
    key: item._id,
    name: item.name,
    code: item.code,
    year: item.year,
    startTMonth: item.startTMonth,
    endTMonth: item.endTMonth,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Year",
      dataIndex: "year",
      // defaultSortOrder: "ascend",
      sorter: (a, b) => b.code - a.code,
    },
    {
      title: "Name",
      dataIndex: "name",
      // showSorterTooltip: { target: "full-header" },
      // filters: [
      //   {
      //     text: "Joe",
      //     value: "Joe",
      //   },
      //   {
      //     text: "Jim",
      //     value: "Jim",
      //   },
      //   {
      //     text: "Submenu",
      //     value: "Submenu",
      //     children: [
      //       {
      //         text: "Green",
      //         value: "Green",
      //       },
      //       {
      //         text: "Black",
      //         value: "Black",
      //       },
      //     ],
      //   },
      // ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Semester Code",
      dataIndex: "code",
      // defaultSortOrder: "ascend",
      sorter: (a, b) => b.code - a.code,
    },

    {
      title: "Start Month",
      dataIndex: "startTMonth",
      // filters: [
      //   {
      //     text: "London",
      //     value: "London",
      //   },
      //   {
      //     text: "New York",
      //     value: "New York",
      //   },
      // ],
      // onFilter: (value, record) =>
      //   record.startMonth.indexOf(value as string) === 0,
    },
    {
      title: "End Month",
      dataIndex: "endTMonth",
      // filters: [
      //   {
      //     text: "London",
      //     value: "London",
      //   },
      //   {
      //     text: "New York",
      //     value: "New York",
      //   },
      // ],
      // onFilter: (value, record) =>
      //   record.startMonth.indexOf(value as string) === 0,
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     age: 32,
  //     address: "London No. 2 Lake Park",
  //   },
  // ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
