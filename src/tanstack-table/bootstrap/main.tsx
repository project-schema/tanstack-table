import * as React from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';

import { Table as BTable } from 'react-bootstrap';

import {
	ColumnDef,
	Row,
	flexRender,
	getCoreRowModel,
	useReactTable,
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

export default function BootstrapTable() {
	const [data, setData] = React.useState(makeData(10));
	const rerender = () => setData(makeData(10));

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
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
		<div className="p-2">
			<Header>Bootstrap Table</Header>
			<BTable striped bordered hover responsive size="md">
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
			</BTable>
			<div className="h-4">
				<button onClick={() => rerender()} className="border p-2">
					Rerender
				</button>
			</div>
		</div>
	);
}
