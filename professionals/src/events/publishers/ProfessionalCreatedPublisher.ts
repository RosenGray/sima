import {Publisher} from '@sima-board/common';
import { ProfessionalCreatedEventData } from '../types';
import { Subjects } from '../subjects';

export class ProfessionalCreatedPublisher extends Publisher<ProfessionalCreatedEventData>{
    readonly subject = Subjects.ProfessionalCreated;
}