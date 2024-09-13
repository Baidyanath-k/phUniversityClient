import React from "react";

export type TAcademicSemester = {
    _id: string;
    name: string;
    code: string;
    year: string;
    startTMonth: string;
    endTMonth: string;
    createdAt: string;
    updatedAt: string;
    __v?: number
};


export type TQueryParams = {
    value: boolean | React.Key;
    name: string;
}

export type TAcademicFaculty = {
    _id: string;
    id: string;
    user: string;
    designation: string;
    name: TFName;
    gender: string;
    bloodGroup: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    profileImg: string;
    isDeleted: boolean;
    academicDepartment: string;
    __v: number;
    fullName: string;
}

export type TFName = {
    firstName: string;
    middleName: string;
    lastName: string;
    _id: string;
}



export type TAcademicDepartment = {
    _id: string;
    name: string;
    refAcademicFaculty: TRefAcademicFaculty;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type TRefAcademicFaculty = {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}