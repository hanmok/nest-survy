import { ParticipatingService } from './participating.service';
import { ParticipatingDTO } from './participating.dto';
export declare class ParticipatingController {
    private participatingService;
    constructor(participatingService: ParticipatingService);
    createParticipating(body: ParticipatingDTO): Promise<import("../util/api-response.model").CustomApiResponse<import("./participating.entity").Participating>>;
}
