import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllStudentsQuery } from "../../../../redux/features/admin/UserManagement.api";
import { TQueryParams } from "../../../../types/academicSemManagement";
import { TStudent } from "../UserManagement.Type";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo" | "_id"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentData,
    // isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;
  console.log(metaData);

  const tableData = studentData?.result.map(
    ({ _id, fullName, id, email, contactNo }: TTableData) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },
    {
      title: "Student Id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact Number",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        console.log(item);
        return (
          <div className="">
            <Link to={`/admin/student-data/${item.id}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </div>
        );
      },
      width: "25%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
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

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
