import { Col, Image, Row } from "antd";
import { useParams } from "react-router-dom";
import { useGetStudentByIdQuery } from "../../../../redux/features/admin/UserManagement.api";

const StudentDetails = () => {
  const { studentId } = useParams();

  const { data } = useGetStudentByIdQuery(studentId);
  // console.log(data?.data?.profileImg);

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="student-header">
            <Row>
              <Col span={12}>
                {data?.data?.profileImg ? (
                  <Image width={200} src={data?.data?.profileImg} />
                ) : (
                  <Image
                    width={200}
                    src="https://i.ibb.co.com/L6P5pwt/default.jpg"
                  />
                )}
              </Col>
              <Col span={12}>
                <h2>ID: {data?.data.id}</h2>
                <h2>Name: {data?.data.fullName}</h2>
                <h2>Department: {data?.data?.academicDepartment?.name}</h2>
                <h2>Department: {data?.data?.academicFaculty?.name}</h2>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StudentDetails;
