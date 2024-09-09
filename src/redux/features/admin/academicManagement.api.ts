import { TAcademicSemester, TQueryParams } from "../../../types/academicSemManagement";
import { TResponse } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAcademicSemesters: builder.query({
            query: (filterData) => {

                // create filter
                const params = new URLSearchParams();
                if (filterData) {
                    filterData.forEach((element: TQueryParams) => {
                        params.append(element.name, element.value as string)
                    });
                }

                return {
                    url: "/academic_semesters/academic-semesters",
                    method: "GET",
                    params: params // create filter
                }
            },
            transformResponse: (response: TResponse<TAcademicSemester[]>) => {
                // console.log("redux", response?.data?.result)
                return {
                    data: response?.data?.result,
                    meta: response?.data?.meta,
                };
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