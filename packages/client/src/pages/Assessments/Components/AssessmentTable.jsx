import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from 'react-bootstrap';

export const AssessmentTable = ({ catAssessments, deleteElementById, onEdit }) => { // Include onEdit in the props
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor(`catName`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Cat Name`,
    }),

    columnHelper.accessor(`catDateOfBirth`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Date of Birth`,
    }),
    columnHelper.accessor(`score`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Score`,
    }),
    columnHelper.accessor(`riskLevel`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Risk Level`,
    }),
    columnHelper.accessor(`instrumentType`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Instrument Type`,
    }),
    columnHelper.accessor(`edit`, {
      cell: info => <Button
        variant="secondary"
        onClick={() => onEdit(info.row.original.id)} // Use the original row data to get the id
      >
        Edit
      </Button>,
      header: `Edit`,
    }),
    columnHelper.accessor(`id`, {
      cell: info => <Button
        variant="danger"
        onClick={async () => {
          await deleteElementById(info.getValue());
        }}
      >Delete</Button>,
      footer: info => info.column.id,
      header: `Delete Cat`,
    }),
  ];

  const data = catAssessments;

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="p-2">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map(headerGroup =>
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header =>
                  <th key={header.id}>
                    {header.isPlaceholder ?
                      null :
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </th>)}
              </tr>)}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row =>
              <tr key={row.id}>
                {row.getVisibleCells().map(cell =>
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>)}
              </tr>)}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup =>
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header =>
                  <th key={header.id}>
                    {header.isPlaceholder ?
                      null :
                      flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                  </th>)}
              </tr>)}
          </tfoot>
        </table>
      </div>
    </>
  );
};
