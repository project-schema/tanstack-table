import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import {
	useReactTable,
	getCoreRowModel,
	getExpandedRowModel,
	ColumnDef,
	flexRender,
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
				id: 'expander',
				header: () => null,
				cell: ({ row }) => {
					return row.getCanExpand() ? (
						<button
							{...{
								onClick: row.getToggleExpandedHandler(),
								style: { cursor: 'pointer' },
							}}
						>
							{row.getIsExpanded() ? '👇' : '👉'}
						</button>
					) : (
						'🔵'
					);
				},
			},
			{
				accessorKey: 'firstName',
				header: 'First Name',
				cell: ({ row, getValue }) => (
					<div
						style={{
							// Since rows are flattened by default,
							// we can use the row.depth property
							// and paddingLeft to visually indicate the depth
							// of the row
							paddingLeft: `${row.depth * 2}rem`,
						}}
					>
						{getValue<string>()}
					</div>
				),
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

type TableProps<TData> = {
	data: TData[];
	columns: ColumnDef<TData>[];
	renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement;
	getRowCanExpand: (row: Row<TData>) => boolean;
};

function Table({
	data,
	columns,
	renderSubComponent,
	getRowCanExpand,
}: TableProps<Person>): JSX.Element {
	const table = useReactTable<Person>({
		data,
		columns,
		getRowCanExpand,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
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
			<Header>Sub Components</Header>
			<div className="h-2" />
			<table className="table">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<div>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
											</div>
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
							<Fragment key={row.id}>
								<tr>
									{/* first row is a normal row */}
									{row.getVisibleCells().map((cell) => {
										return (
											<td key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										);
									})}
								</tr>
								{row.getIsExpanded() && (
									<tr>
										{/* 2nd row is a custom 1 cell row */}
										<td colSpan={row.getVisibleCells().length}>
											{renderSubComponent({ row })}
										</td>
									</tr>
								)}
							</Fragment>
						);
					})}
				</tbody>
			</table>
			<div className="h-2" />
			<div>{table.getRowModel().rows.length} Rows</div>
		</div>
	);
}

const renderSubComponent = ({ row }: { row: Row<Person> }) => {
	return (
		<pre style={{ fontSize: '10px' }}>
			<code>{JSON.stringify(row.original, null, 2)}</code>
		</pre>
	);
};

export default function SubComponents() {
	const [data] = React.useState(() => makeData(10));

	return (
		<Table
			data={data}
			columns={columns}
			getRowCanExpand={() => true}
			renderSubComponent={renderSubComponent}
		/>
	);
}
