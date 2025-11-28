import {SortListEnum} from "../sort-list-enum";
import {CustomSortDirection} from "../sorting-direction-mongo";

export type InputDriverQuery = {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortListEnum;
    sortDirection?: CustomSortDirection;
    searchDriverNameTerm?: string;
    searchDriverEmailTerm?: string;
    searchVehicleMakeTerm?: string;
};