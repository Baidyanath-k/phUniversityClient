import { useGetAllAcademicSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemestersQuery(undefined);
  console.log(data);
  return (
    <div>
      <h2>Academic Semester</h2>
    </div>
  );
};

export default AcademicSemester;
