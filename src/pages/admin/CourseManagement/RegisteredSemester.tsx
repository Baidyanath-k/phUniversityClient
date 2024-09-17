import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import moment from "moment";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetAllSemesterRegistrationQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/semesterRegistration.api";
import { TSemesterRegistration } from "./CourseManagement.type";

export type TTableData = Pick<
  TSemesterRegistration,
  "startDate" | "endDate" | "status" | "_id" | "academicSemester"
>;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemester = () => {
  const { data: semesterRegistration } =
    useGetAllSemesterRegistrationQuery(undefined);

  const tableData = semesterRegistration?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }: TTableData) => ({
      key: _id,
      name: academicSemester.name,
      year: academicSemester.year,
      startDate: moment(new Date(startDate)).format("MMMM Do YYYY"),
      endDate: moment(new Date(endDate)).format("MMMM Do YYYY"),
      status,
    })
  );

  const [semesterId, setSemesterId] = useState("");
  const [updateSemesterStatus] = useUpdateSemesterRegistrationMutation();

  const handleStatusUpdate = async (data: FieldValues) => {
    if (!semesterId) return;

    const toastId = toast.loading("Updating......");

    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    try {
      await updateSemesterStatus(updateData).unwrap();
      toast.success("Status updated successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default RegisteredSemester;
