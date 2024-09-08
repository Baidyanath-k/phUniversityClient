import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAcademicSemesters: builder.query({
            query: () => ({
                url: "/academic_semesters/academic-semesters",
                method: "GET",
            }),
            transformResponse: (response) => {
                // console.log("redux", response?.data?.meta)
                return {
                    data: response?.data?.result,
                    meta: response?.data?.meta,
                }
            }
        }),
        createAcademicSemesters: builder.mutation({
            query: (data) => ({
                url: "/academic_semesters/create_academic_sem",
                method: "POST",
                body: { ...data }
            }),
        }),
    }),
});

export const { useGetAllAcademicSemestersQuery, useCreateAcademicSemestersMutation } = academicManagementApi;