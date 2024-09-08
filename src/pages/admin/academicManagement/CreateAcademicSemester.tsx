/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useCreateAcademicSemestersMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";

const CreateAcademicSemester = () => {
  const nameOptions = [
    {
      value: "01",
      label: "Autumn",
    },
    {
      value: "02",
      label: "Summer",
    },
    {
      value: "03",
      label: "Fall",
    },
  ];
  const [selectedCode, setSelectedCode] = useState("");
  // const [defaultCode, setDefaultCode] = useState("");
  const [selectedStartMonth, setSelectedStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  // Create Semester Year
  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4, 5, 6].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));

  // create month options
  const monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthsOptions = monthsNames.map((month) => ({
    value: month,
    label: month,
  }));

  //zod validation schema
  const academicSemesterSchema = z.object({
    name: z.string({ required_error: "This field is required!" }),
    year: z.string({ required_error: "This field is required!" }),
    startTMonth: z.string({ required_error: "This field is required!" }),
    endTMonth: z.string({ required_error: "This field is required!" }),
  });

  // Function to calculate end month based on start month
  const calculateEndMonth = (startMonth: string) => {
    const startIndex = monthsNames.indexOf(startMonth);
    if (startIndex !== -1) {
      const endIndex = (startIndex + 3) % 12;
      return monthsNames[endIndex];
    }
    return "";
  };

  // Set end month automatically when start month changes
  useEffect(() => {
    if (selectedStartMonth) {
      const calculatedEndMonth = calculateEndMonth(selectedStartMonth);
      setEndMonth(calculatedEndMonth);
    }
  }, [selectedStartMonth]);

  // useEffect(() => {
  //   if (selectedCode) {
  //     setDefaultCode(selectedCode);
  //   }
  // }, [selectedCode]);

  const [createAcademicSem] = useCreateAcademicSemestersMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading......");
    // console.log(data);
    const name = nameOptions[Number(data.name) - 1].label;

    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startTMonth: data.startTMonth,
      endTMonth: data.endTMonth || endMonth,
    };

    try {
      console.log(semesterData);
      const res = (await createAcademicSem(semesterData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("The academic semester has been successfully created.", {
          id: toastId,
        });
      }
      console.log(res);
    } catch (error) {
      toast.error("something went wrong! Academic semester is not created!");
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Create Academic Semester
        </h2>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Semester Name:"
            name="name"
            placeholderItem="Academic Semester Name"
            options={nameOptions}
            onChange={(value) => setSelectedCode(value)}
          />
          {/* <span style={{ marginBottom: "10px", display: "block" }}>
            Semester Code: {selectedCode}
          </span> */}

          <PHInput
            type="text"
            name="code"
            label="Semester Code"
            placeholderItem="Semester Code"
            defaultValue={selectedCode}
          />

          <PHSelect
            label="Semester Year:"
            name="year"
            placeholderItem="Academic Semester year"
            options={yearOptions}
          />

          <PHSelect
            label="Semester Start Month:"
            name="startTMonth"
            placeholderItem="Academic Semester Start Month"
            options={monthsOptions}
            onChange={(value) => setSelectedStartMonth(value)}
          />

          <PHSelect
            label="Semester End Month:"
            name="endTMonth"
            placeholderItem="Academic Semester End Month"
            options={monthsOptions}
            defaultValue={endMonth} // Automatically set the calculated end month
          />

          <Button style={{ display: "block" }} htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
