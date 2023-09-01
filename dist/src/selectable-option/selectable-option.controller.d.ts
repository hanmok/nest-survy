import { SelectableOptionService } from './selectable-option.service';
import { CreateSelectableOptionDTO } from './createSelectableOption.dto';
export declare class SelectableOptionController {
    private selectableOptionService;
    constructor(selectableOptionService: SelectableOptionService);
    getAllSelectableOptions(): Promise<import("../util/api-response.model").CustomApiResponse<import("./selectable-option.entity").SelectableOption[]>>;
    createSelectableOption(body: CreateSelectableOptionDTO): Promise<import("../util/api-response.model").CustomApiResponse<import("./selectable-option.entity").SelectableOption>>;
}
