import BasicTable from './tanstack-table/basic/main';
import BootstrapTable from './tanstack-table/bootstrap/main';
import ColumnDND from './tanstack-table/column-dnd/main';
import ColumnGroup from './tanstack-table/column-groups/main';
import ColumnOrdering from './tanstack-table/column-ordering/main';
import ColumnPinningSticky from './tanstack-table/column-pinning-sticky/main';
import ColumnPinning from './tanstack-table/column-pinning/main';
import ColumnResizingPerformant from './tanstack-table/column-resizing-performant/main';
import ColumnSizing from './tanstack-table/column-sizing/main';
import ColumnVIsibility from './tanstack-table/column-visibility/main';
import CustomFeatures from './tanstack-table/custom-features/main';
import EditableData from './tanstack-table/editable-data/main';
import Expanding from './tanstack-table/expanding/main';
import FilterFetched from './tanstack-table/filters-faceted/main';
import FilterFuzzy from './tanstack-table/filters-fuzzy/main';
import FilterTable from './tanstack-table/filters/main';
import FullWidthResizeAbleTable from './tanstack-table/full-width-resizable-table/main';
import FullWidthTable from './tanstack-table/full-width-table/main';
import FullyControl from './tanstack-table/fully-controlled/main';
import Grouping from './tanstack-table/grouping/main';
import { KitchenSink } from './tanstack-table/kitchen-sink/App';
import PaginationControlled from './tanstack-table/pagination-controlled/main';
import Pagination from './tanstack-table/pagination/main';
import RowDND from './tanstack-table/row-dnd/main';
import RowPinning from './tanstack-table/row-pinning/main';
import RowSelection from './tanstack-table/row-selection/main';
import Sorting from './tanstack-table/sorting/main';
import SubComponents from './tanstack-table/sub-components/main';
import VirtualizedColumns from './tanstack-table/virtualized-columns/main';
import VirtualizedInfinityScroll from './tanstack-table/virtualized-infinite-scrolling/main';
import VirtualizedRows from './tanstack-table/virtualized-rows/main';
import VirtualizedColumn from './tanstack-table/virtualized-rows/main';

function App() {
	return (
		<div className="container">
			<BasicTable />
			<BootstrapTable />
			<ColumnDND />
			<ColumnGroup />
			<ColumnOrdering />
			<ColumnPinning />
			<ColumnPinningSticky />
			<ColumnResizingPerformant />
			<ColumnSizing />
			<ColumnVIsibility />
			<CustomFeatures />
			<EditableData />
			<Expanding />
			<FilterTable />
			<FilterFetched />
			<FilterFuzzy />
			<FullWidthResizeAbleTable />
			<FullWidthTable />
			<FullyControl />
			<Grouping />
			<KitchenSink />
			<Pagination />
			{/* <PaginationControlled /> */}
			{/* <RowDND /> */}
			{/* <RowPinning /> */}
			<RowSelection />
			<Sorting />
			<SubComponents />
			{/* <VirtualizedInfinityScroll /> */}
			<VirtualizedColumns />
			<VirtualizedRows />
		</div>
	);
}

export default App;
