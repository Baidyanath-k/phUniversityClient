import { TQueryParams } from "../../../types/academicSemManagement";
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
        })
    })
});


export const { useCreateStudentsMutation, useGetAllStudentsQuery } = UserManagementApi;

