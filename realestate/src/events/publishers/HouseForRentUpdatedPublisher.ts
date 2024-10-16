import {Publisher} from '@sima-board/common';
import {  HouseForRentUpdatedEventData } from '../types';
import { Subjects } from '../subjects';

export class HouseForRentUpdatedPublisher extends Publisher<HouseForRentUpdatedEventData>{
    readonly subject = Subjects.HouseForRentUpdated;
}