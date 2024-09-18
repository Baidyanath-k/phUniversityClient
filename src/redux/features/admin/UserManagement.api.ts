import { TAcademicFaculty, TQueryParams } from "../../../types/academicSemManagement";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const UserManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStudents: builder.mutation({
            query: (data) => ({
                url: "/users/create_student",
                method: "POST",
                body: data
            }),
        }),

        getAllStudents: builder.query({
            query: (queryData) => {

                const params = new URLSearchParams();
                if (queryData) {
                    queryData.forEach((element: TQueryParams) => {
                        params.append(element.name, element.value as string)
                    });
                }

                return {
                    url: "/students/get_all_students",
                    method: "GET",
                    params: params
                }
            }
        }),

        getStudentById: builder.query({
            query: (studentId: string | undefined) => {
                return {
                    url: `/students/find_student/${studentId}`,
                    method: 'GET'
                }
            }
        }),

        // Get ALL FACULTIES
        getAllFaculties: builder.query({
            query: (queryData) => {

                const params = new URLSearchParams();
                if (queryData) {
                    queryData.forEach((element: TQueryParams) => {
                        params.append(element.name, element.value as string)
                    });
                }

                return {
                    url: "/faculty/get-all-faculty",
                    method: "GET",
                    params: params
                }

            },

            transformResponse: (response: TResponseRedux<TAcademicFaculty>) => {
                return {
                    data: response?.data?.result,
                    meta: response?.data?.meta,
                }
            }
        }),
    })
});


export const {
    useCreateStudentsMutation,
    useGetAllStudentsQuery,
    useGetStudentByIdQuery,
    useGetAllFacultiesQuery,
} = UserManagementApi;

