import {Publisher} from '@sima-board/common';
import { HouseForRentCreatedEventData } from '../types';
import { Subjects } from '../subjects';

export class HouseForRentCreatedPublisher extends Publisher<HouseForRentCreatedEventData>{
    readonly subject = Subjects.HouseForRentCreated;
}