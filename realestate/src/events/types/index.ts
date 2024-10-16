import { Subjects } from "../subjects";

export interface HouseForRentCreatedEventData {
    subject:Subjects.HouseForRentCreated;
    data:{
        id:string;
        title:string;
        userId:string;
        version:number;
    }
}

export interface HouseForRentUpdatedEventData {
    subject:Subjects.HouseForRentUpdated;
    data:{
        id:string;
        title:string;
        userId:string;
        version:number;
    }
}