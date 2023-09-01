import { Survey } from 'src/survey/survey.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    collected_reward: number;
    birth_date: string;
    is_male: number;
    surveys: Survey[];
}
