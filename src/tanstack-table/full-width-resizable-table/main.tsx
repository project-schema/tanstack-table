import React from 'react';
import './index.css';

import {
	getCoreRowModel,
	ColumnDef,
	flexRender,
	useReactTable,
	Row,
} from '@tanstack/react-table';
import { makeData, Person } from './makeData';
import Header from '../../components/Header';

const columns: ColumnDef<Person>[] = [
	{
		header: 'Name',
		footer: (props) => props.column.id,
		columns: [
			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.lastName,
				id: 'lastName',
				cell: (info) => info.getValue(),
				header: () => <span>Last Name</span>,
				footer: (props) => props.column.id,
			},
		],
	},
	{
		header: 'Info',
		footer: (props) => props.column.id,
		columns: [
			{
				accessorKey: 'age',
				header: () => 'Age',
				footer: (props) => props.column.id,
			},
			{
				header: 'More Info',
				columns: [
					{
						accessorKey: 'visits',
						header: () => <span>Visits</span>,
						footer: (props) => props.column.id,
					},
					{
						accessorKey: 'status',
						header: 'Status',
						footer: (props) => props.column.id,
					},
					{
						accessorKey: 'progress',
						header: 'Profile Progress',
						footer: (props) => props.column.id,
					},
				],
			},
		],
	},
];

export default function FullWidthResizeAbleTable() {
	const data = React.useMemo(() => makeData(20), []);

	const table = useReactTable({
		data,
		columns,
		enableColumnResizing: true,
		columnResizeMode: 'onChange',
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
		filterFns: {
			fuzzy: () => false,
		},
		aggregationFns: {
			progress: function (
				columnId: string,
				leafRows: Row<any>[],
				childRows: Row<any>[]
			) {
				throw new Error('Function not implemented.');
			},
		},
	});

	return (
		<div className="p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
			<Header>Full Width Resizable Table</Header>
			<div className="h-2" />
			<table className="w-full table ">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th
										key={header.id}
										colSpan={header.colSpan}
										style={{ position: 'relative', width: header.getSize() }}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
										{header.column.getCanResize() && (
											<div
												onMouseDown={header.getResizeHandler()}
												onTouchStart={header.getResizeHandler()}
												className={`resizer ${
													header.column.getIsResizing() ? 'isResizing' : ''
												}`}
											></div>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									return (
										<td key={cell.id} style={{ width: cell.column.getSize() }}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="h-4" />
		</div>
	);
}
