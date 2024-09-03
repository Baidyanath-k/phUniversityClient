import { Button, Col, Flex } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";

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

  // Create Semester Year
  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4, 5, 6].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const name = nameOptions[Number(data.name) - 1].label;
    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
    };
    setSelectedCode(semesterData.code);
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Create Academic Semester
        </h2>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Semester Name"
            name="name"
            placeholderItem="Academic Semester Name"
            options={nameOptions}
          />
          <span style={{ marginBottom: "10px", display: "block" }}>
            Semester Code: {selectedCode}
          </span>

          <PHSelect
            label="Semester Year"
            name="year"
            placeholderItem="Academic Semester year"
            options={yearOptions}
          />
          <PHSelect
            label="Semester Start Month"
            name="startTMonth"
            placeholderItem="Academic Semester Start Month"
            options={nameOptions}
          />
          <PHSelect
            label="Semester End Month"
            name="endTMonth"
            placeholderItem="Academic Semester End Month"
            options={nameOptions}
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
