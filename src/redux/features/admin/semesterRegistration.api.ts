import { TSemesterRegistration } from "../../../pages/admin/CourseManagement/CourseManagement.type";
import { TQueryParams } from "../../../types/academicSemManagement";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const semesterRegistrationApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        createSemesterRegistration: builder.mutation({
            query: (data) => ({
                url: "/semester-registration/create-semester-register",
                method: "POST",
                body: data
            })
        }),

        getAllSemesterRegistration: builder.query({
            query: (queryData) => {
                const params = new URLSearchParams();

                if (queryData) {
                    queryData.foreach((element: TQueryParams) => {
                        return params.append(element.name, element.value as string);
                    })
                }
                return {
                    url: "/semester-registration/get-all-semester-register",
                    method: "GET",
                    params: params,
                }
            },
            transformResponse: (response: TResponseRedux<TSemesterRegistration>) => {
                return {
                    data: response?.data?.result,
                    meta: response?.data?.meta,
                }
            }
        }),


        updateSemesterRegistration: builder.mutation({
            query: (args) => ({
                url: `/semester-registration/update-semester-registration/${args.id}`,
                method: 'PATCH',
                body: args.data
            })
        }),
    })

})

export const { useCreateSemesterRegistrationMutation, useGetAllSemesterRegistrationQuery, useUpdateSemesterRegistrationMutation } = semesterRegistrationApi;