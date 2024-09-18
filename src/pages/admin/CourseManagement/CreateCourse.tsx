import { Button, Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useCreateCoursesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/semesterRegistration.api";

const CreateCourse = () => {
  const { data: allCourses } = useGetAllCoursesQuery(undefined);

  // console.log(allCourses?.data)

  const [addCourses] = useCreateCoursesMutation();

  const preRequisiteCoursesOptions = allCourses?.data?.map(
    (item: { _id: string; title: string }) => ({
      value: item._id,
      label: item.title,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      isDeleted: false,
      credits: Number(data.credits),
      preRequisiteCourses: data?.preRequisiteCourses?.map(
        (item: { item: string; isDeleted: boolean }) => ({
          course: item,
          isDeleted: false,
        })
      ),
    };

    try {
      const res = await addCourses(courseData);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (error) {
      console.log(error.data.message);
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
              Create Course
            </h2>
          </Col>
        </Row>
        <Row justify={"center"} align={"middle"}>
          <Col span={8}>
            <PHForm onSubmit={onSubmit}>
              <PHInput
                type="text"
                label="Course Title"
                name="title"
                placeholderItem="Course Title"
              />
              <PHInput
                type="text"
                label="Course prefix"
                name="prefix"
                placeholderItem="Course prefix"
              />
              <PHInput
                type="text"
                label="Course code"
                name="code"
                placeholderItem="Course code"
              />
              <PHInput
                type="number"
                label="Course credits"
                name="credits"
                placeholderItem="Course credits"
              />
              <PHSelect
                options={preRequisiteCoursesOptions}
                mode="multiple"
                label="Pre Requisite Courses"
                name="preRequisiteCourses"
                placeholderItem="Pre Requisite Courses"
              />

              <Button htmlType="submit">Submit</Button>
            </PHForm>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CreateCourse;
