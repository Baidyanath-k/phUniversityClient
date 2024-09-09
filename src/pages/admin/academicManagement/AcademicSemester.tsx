import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import {
  TAcademicSemester,
  TQueryParams,
} from "../../../types/academicSemManagement";

interface DataType {
  key: React.Key;
  name: string;
  code: number;
  year: string;
  startTMonth: string;
  endTMonth: string;
}

export type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "code" | "startTMonth" | "endTMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllAcademicSemestersQuery(params); //"params" use for filter

  const tableData = semesterData?.data.map((item: TTableData) => ({
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
      key: "year",
      dataIndex: "year",

      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
        {
          text: "2028",
          value: "2028",
        },
        {
          text: "2029",
          value: "2029",
        },
        {
          text: "2030",
          value: "2030",
        },
      ],
      // sorter: false,
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.year.localeCompare(b.year),
      sortDirections: ["ascend"],
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Semester Code",
      key: "code",
      dataIndex: "code",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.code - b.code,
      sortDirections: ["ascend"],
    },

    {
      title: "Start Month",
      dataIndex: "startTMonth",
    },
    {
      title: "End Month",
      dataIndex: "endTMonth",
    },
    {
      title: "Action",
      key: "X",
      render: () => {
        return (
          <div className="">
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      console.log(queryParams);

      setParams(queryParams);
    }
  };

  // custom Loading
  // if (isLoading) {
  //   return <>Loading.......</>
  // }

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
