import React from 'react';
import ReactDOM from 'react-dom/client';
import { faker } from '@faker-js/faker';

import './index.css';

import {
	ColumnDef,
	ColumnOrderState,
	Row,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { makeData, Person } from './makeData';
import Header from '../../components/Header';

const defaultColumns: ColumnDef<Person>[] = [
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

export default function ColumnOrdering() {
	const [data, setData] = React.useState(() => makeData(20));
	const [columns] = React.useState(() => [...defaultColumns]);

	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);

	const rerender = () => setData(() => makeData(20));

	const table = useReactTable({
		data,
		columns,
		state: {
			columnVisibility,
			columnOrder,
		},
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
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

	const randomizeColumns = () => {
		table.setColumnOrder(
			faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id))
		);
	};

	return (
		<div className="p-2">
			<Header>Column Ordering</Header>
			<div className="inline-block border border-black shadow rounded">
				<div className="px-1 border-b border-black">
					<label>
						<input
							{...{
								type: 'checkbox',
								checked: table.getIsAllColumnsVisible(),
								onChange: table.getToggleAllColumnsVisibilityHandler(),
							}}
						/>{' '}
						Toggle All
					</label>
				</div>
				{table.getAllLeafColumns().map((column) => {
					return (
						<div key={column.id} className="px-1">
							<label>
								<input
									{...{
										type: 'checkbox',
										checked: column.getIsVisible(),
										onChange: column.getToggleVisibilityHandler(),
									}}
								/>{' '}
								{column.id}
							</label>
						</div>
					);
				})}
			</div>
			<div className="h-4" />
			<div className="flex flex-wrap gap-2">
				<button onClick={() => rerender()} className="border p-1">
					Regenerate
				</button>
				<button onClick={() => randomizeColumns()} className="border p-1">
					Shuffle Columns
				</button>
			</div>
			<div className="h-4" />
			<table className="table">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
			<pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
		</div>
	);
}
