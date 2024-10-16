import { Subjects } from "../subjects";

export interface ProfessionalCreatedEventData {
    subject:Subjects.ProfessionalCreated;
    data:{
        id:string;
        title:string;
    }
}