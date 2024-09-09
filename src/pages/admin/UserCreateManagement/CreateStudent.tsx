const studentDammy = {
  password: "ami123",
  student: {
    name: {
      firstName: "Akon",
      secondName: "Doe",
      lastName: "Smith",
    },
    gender: "male",
    email: "akon@example.com",
    contactNo: "123456789999",
    emergencyContactNo: "098765432199",
    dateOfBirth: "2000-01-01",
    bloodGroup: "O+",
    presentAddress: "123 Main St, Hometown",
    permanentAddress: "456 Another St, Hometown",
    admissionSemester: "665f5533479528ced2e2bc9c",
    guardian: {
      fatherName: "Michael Smith",
      fatherOccupation: "Engineer",
      fatherContactNo: "11223344999",
      motherName: "Sarah Smith",
      motherOccupation: "Teacher",
      motherContactNo: "2233445999",
    },
    profileImg: "http://example.com/profile.jpg",
    isDeleted: false,
    academicDepartment: "66645c2e8d28200ccfba57de",
    localGuardian: {
      name: "Uncle Bob",
      occupation: "Doctor",
      contactNo: "3344556999",
      address: "789 Guardian St, Hometown",
    },
  },
};

const CreateStudent = () => {
  return (
    <div>
      <h2>This is create student</h2>
    </div>
  );
};

export default CreateStudent;
