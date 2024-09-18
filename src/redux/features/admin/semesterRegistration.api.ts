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
            }),
            invalidatesTags: ['semester'],
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
            providesTags: ['semester'],
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
            }),
            invalidatesTags: ['semester'],
        }),


        // GET ALL COURSES

        getAllCourses: builder.query({
            query: (queryData) => {
                const params = new URLSearchParams();

                if (queryData) {
                    queryData.foreach((element: TQueryParams) => {
                        return params.append(element.name, element.value as string);
                    })
                }
                return {
                    url: "/courses/find-all-course",
                    method: "GET",
                    params: params,
                }
            },
            providesTags: ['courses'],
            transformResponse: (response: TResponseRedux<TSemesterRegistration>) => {
                return {
                    data: response?.data?.result,
                    meta: response?.data?.meta,
                }
            }
        }),

        // create courses
        createCourses: builder.mutation({
            query: (data) => ({
                url: "/courses/create-course",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['courses'],
        }),

        // Add Faculties
        addFaculties: builder.mutation({
            query: (args) => ({
                url: `/courses/faculties/${args.courseId}/assign-faculties`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags: ['courses'],
        }),
    })

})

export const {
    useCreateSemesterRegistrationMutation,
    useGetAllSemesterRegistrationQuery,
    useUpdateSemesterRegistrationMutation,
    useGetAllCoursesQuery,
    useCreateCoursesMutation,
    useAddFacultiesMutation
} = semesterRegistrationApi;