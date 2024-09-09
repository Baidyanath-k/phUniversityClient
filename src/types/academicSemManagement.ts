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