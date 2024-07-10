import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemesters: builder.query({
      query: () => ({
        url: "/academic_semesters/academic-semesters",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAcademicSemestersQuery } = academicSemesterApi;
