import { Button, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/UserManagement.api";
import { useAddFacultiesMutation } from "../../../redux/features/admin/semesterRegistration.api";

const AddFacultyModal = ({ item }) => {
  const { data: faculty } = useGetAllFacultiesQuery(undefined);
  //   console.log(faculty?.data);
  console.log(item);

  const facultyOptions = faculty?.data?.map((item) => ({
    value: item._id,
    label: `${item.fullName}--${item.academicDepartment.name}`,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [addFaculties] = useAddFacultiesMutation();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating...");
    const facultyData = {
      courseId: item.key,
      data,
    };
    try {
      const res = await addFaculties(facultyData);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty added.", { id: toastId });
      }
    } catch (error) {
      console.log(error.data.message);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Faculty
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Add Faculty"
            name="faculties"
            mode="multiple"
            placeholderItem="Select Faculty"
            options={facultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default AddFacultyModal;
