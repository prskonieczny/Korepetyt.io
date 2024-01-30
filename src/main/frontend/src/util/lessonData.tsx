export interface IShowLessonsData {
    lessonId: number,
    startTime: Date,
    endTime: Date,
    studentUsername: string,
    teacherUsername: string,
    description: string,
    subject: string,
    lessonStatus: string,
    image: string
}

export interface ICreateLessonData {
    startTime: string,
    endTime: string,
    subject: string,
    description: string,
    image: string
}