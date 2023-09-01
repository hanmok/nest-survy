import { User } from 'src/user/user.entity';
export declare class Survey {
    id: number;
    current_participation: number;
    participation_goal: number;
    title: string;
    reward_range: string;
    is_completed: number;
    is_public: number;
    code: string;
    users: User[];
    initial_section_id: number | undefined;
}
