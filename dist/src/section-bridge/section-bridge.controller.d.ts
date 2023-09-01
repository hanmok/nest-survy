import { SectionBridgeService } from './section-bridge.service';
import { SectionBridgeDTO } from './SectionBridge.dto';
export declare class SectionBridgeController {
    private sectionBridgeService;
    constructor(sectionBridgeService: SectionBridgeService);
    create(body: SectionBridgeDTO): Promise<import("../util/api-response.model").CustomApiResponse<import("./section-bridge.entity").SectionBridge>>;
}
