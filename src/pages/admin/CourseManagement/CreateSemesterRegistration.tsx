import { Button, Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/semesterRegistration.api";

const CreateSemesterRegistration = () => {
  const [addSemester] = useCreateSemesterRegistrationMutation();

  const { data: academicSemester } = useGetAllAcademicSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];
  const semesterRegistrationStatusOptions = semesterRegistrationStatus.map(
    (item) => ({
      value: item,
      label: item.charAt(0) + item.substring(1).toLowerCase(),
    })
  );

  const academicSemesterOptions = academicSemester?.data?.map(
    (item: { _id: string; name: string; year: string }) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = await addSemester(semesterData);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Create Semester Registration
            </h2>
          </Col>
        </Row>
        <Row justify={"center"} align={"middle"}>
          <Col span={8}>
            <PHForm onSubmit={onSubmit}>
              <PHSelect
                label="Choose Academic Semester"
                name="academicSemester"
                placeholderItem="Academic Semester"
                options={academicSemesterOptions}
              />
              <PHSelect
                label="Status"
                name="status"
                placeholderItem="Status"
                options={semesterRegistrationStatusOptions}
              />

              <PHDatePicker name="startDate" label="Select Start Date" />
              <PHDatePicker name="endDate" label="Select End Date" />

              <PHInput
                type="number"
                name="minCredit"
                placeholderItem="Input Minimum Credit"
                label="Minimum Credit"
              />

              <PHInput
                type="number"
                name="maxCredit"
                placeholderItem="Input Maximum Credit"
                label="Maximum Credit"
              />

              <Button htmlType="submit">Submit</Button>
            </PHForm>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CreateSemesterRegistration;
