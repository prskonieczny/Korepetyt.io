export interface IOpinionData {
    opinionId: number;
    starReview: string,
    opinionContent: string,
    opinionPros: string,
    opinionCons: string,
    studentUsername: string,
    teacherUsername: string,
    creationDate: Date,
}

export interface IAddOpinionData {
    starReview: string,
    opinionContent: string,
    opinionPros: string,
    opinionCons: string,
    teacherUsername: string | undefined
}