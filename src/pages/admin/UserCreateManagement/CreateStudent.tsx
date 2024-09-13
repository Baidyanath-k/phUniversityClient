/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useCreateStudentsMutation } from "../../../redux/features/admin/UserManagement.api";
import { bloodGroupOptions, genderOptions } from "./UserManagementConst";

// const studentDefaultValues = {
//   name: {
//     firstName: "I am ",
//     secondName: "Student",
//     lastName: "NumberOne",
//   },
//   gender: "male",

//   bloodGroup: "A+",

//   contactNo: "1235678",
//   emergencyContactNo: "987-654-3210",
//   presentAddress: "123 Main St, Cityville",
//   permanentAddress: "456 Oak St, Townsville",

//   guardian: {
//     fatherName: "James Doe",
//     fatherOccupation: "Engineer",
//     fatherContactNo: "111-222-3333",
//     motherName: "Mary Doe",
//     motherOccupation: "Teacher",
//     motherContactNo: "444-555-6666",
//   },

//   localGuardian: {
//     name: "Alice Johnson",
//     occupation: "Doctor",
//     contactNo: "777-888-9999",
//     address: "789 Pine St, Villageton",
//   },

//   admissionSemester: "66deca05334ff84e05c4c34d",
//   academicDepartment: "666532c9abfbc22caeecd2dc",
// };

const CreateStudent = () => {
  const [createStudent, { data, error }] = useCreateStudentsMutation(undefined);
  if (error) {
    toast.success(error?.data?.message);
  }
  if (data) {
    toast.success(data?.message);
  }

  const { data: semesterData, isLoading: sLoading } =
    useGetAllAcademicSemestersQuery(undefined);

  const { data: aDepartment, isLoading: aDepartmentIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const semesterOptions = semesterData?.data.map(
    (item: { _id: string; name: string; year: string }) => ({
      value: item._id,
      label: `${item.name}-${item.year}`,
    })
  );

  const departmentOptions = aDepartment?.data.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  // Form Submit
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);

    const studentData = {
      password: data.password || "123456",
      student: data,
    };

    // Form Data
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImg);

    // Data send
    createStudent(formData);

    // console Form Data style
    console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onsubmit}>
          <Divider>Personal Information</Divider>
          <Row gutter={12}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="First Name" name="name.firstName" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="Second Name" name="name.secondName" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="Last Name" name="name.lastName" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeholderItem="Select Gender"
                options={genderOptions}
                label="Gender"
                name="gender"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker label="Date of Birth" name="dateOfBirth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                label="Blood Group"
                name="bloodGroup"
                placeholderItem="Select Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Divider>Contact Information</Divider>
          <Row gutter={12}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="Email" name="email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="Contact Number" name="contactNo" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Emergency Contact Number"
                name="emergencyContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Present Address"
                name="presentAddress"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Permanent Address"
                name="permanentAddress"
              />
            </Col>
          </Row>

          <Divider>Permanent Guardian Information</Divider>
          <Row gutter={12}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Father Name"
                name="guardian.fatherName"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Father Occupation"
                name="guardian.fatherOccupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Father Contact Number"
                name="guardian.fatherContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Mother Name"
                name="guardian.motherName"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Mother Occupation"
                name="guardian.motherOccupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Mother Contact Number"
                name="guardian.motherContactNo"
              />
            </Col>
          </Row>

          <Divider>Local Guardian Information</Divider>
          <Row gutter={12}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="Name" name="localGuardian.name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Occupation"
                name="localGuardian.occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Contact Number"
                name="localGuardian.contactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Address"
                name="localGuardian.address"
              />
            </Col>
          </Row>

          <Divider>Academic Information</Divider>
          <Row gutter={12}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                placeholderItem="Academic Department"
                label="Academic Department Name"
                name="academicDepartment"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                placeholderItem="Select Semester"
                disabled={sLoading}
                label="Academic Semester"
                name="admissionSemester"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
