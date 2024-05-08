import { AggregationFn, FilterFn } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
	interface FilterFns {
		fuzzy: FilterFn<unknown>;
	}

	interface AggregationFns {
		progress: AggregationFn<unknown>;
	}
}

export const fuzzyFilter: FilterFn<any>;
export const progressAggregator: AggregationFn<any>;
