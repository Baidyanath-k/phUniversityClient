import { baseApi } from "../../api/baseApi";

const semesterRegistrationApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        createSemesterRegistration: builder.mutation({
            query: (data) => ({
                url: "/semester-registration/create-semester-register",
                method: "POST",
                body: data
            })
        })
    })

})

export const { useCreateSemesterRegistrationMutation } = semesterRegistrationApi;