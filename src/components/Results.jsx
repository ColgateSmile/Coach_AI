import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { CSVLink } from 'react-csv';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    flex: 1,
  },
});

const Results = ({ results }) => {
  if (!results) {
    return <div>No training program available.</div>;
  }

  const [data, setData] = useState(() => {
    // Parse the training program into an array of weeks
    const weeks = results.split('Week ');
    return weeks.slice(1).map((week) => {
      const [weekNumber, activities] = week.split(':\n');
      return {
        week: `Week ${weekNumber.trim()}`,
        activities: activities.split('\n').filter((line) => line.trim()),
        runVolume: '',
        targetTime: '',
        targetBenefit: '',
        targetHRZone: '',
      };
    });
  });

  const columns = [
    {
      header: 'Week',
      accessorKey: 'week',
    },
    {
      header: 'Activities',
      accessorKey: 'activities',
      cell: ({ row }) => (
        <ul>
          {row.original.activities.map((activity, index) => (
            <li key={index}>{activity.replace('- ', '')}</li>
          ))}
        </ul>
      ),
    },
    {
      header: 'Run Volume',
      accessorKey: 'runVolume',
      cell: ({ row }) => (
        <input
          type="text"
          value={row.original.runVolume}
          onChange={(e) => {
            const newData = [...data];
            newData[row.index].runVolume = e.target.value;
            setData(newData);
          }}
        />
      ),
    },
    {
      header: 'Target Time',
      accessorKey: 'targetTime',
      cell: ({ row }) => (
        <input
          type="text"
          value={row.original.targetTime}
          onChange={(e) => {
            const newData = [...data];
            newData[row.index].targetTime = e.target.value;
            setData(newData);
          }}
        />
      ),
    },
    {
      header: 'Target Benefit',
      accessorKey: 'targetBenefit',
      cell: ({ row }) => (
        <select
          value={row.original.targetBenefit}
          onChange={(e) => {
            const newData = [...data];
            newData[row.index].targetBenefit = e.target.value;
            setData(newData);
          }}
        >
          <option value="">Select</option>
          <option value="Aerobic">Aerobic</option>
          <option value="Technic">Technic</option>
          <option value="Strength">Strength</option>
        </select>
      ),
    },
    {
      header: 'Target HR Zone',
      accessorKey: 'targetHRZone',
      cell: ({ row }) => (
        <input
          type="text"
          value={row.original.targetHRZone}
          onChange={(e) => {
            const newData = [...data];
            newData[row.index].targetHRZone = e.target.value;
            setData(newData);
          }}
        />
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Download as CSV
  const csvData = data.map((row) => ({
    Week: row.week,
    Activities: row.activities.join(', '),
    'Run Volume': row.runVolume,
    'Target Time': row.targetTime,
    'Target Benefit': row.targetBenefit,
    'Target HR Zone': row.targetHRZone,
  }));

  // Download as PDF
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {columns.map((column) => (
              <View key={column.header} style={styles.tableCell}>
                <Text>{column.header}</Text>
              </View>
            ))}
          </View>
          {data.map((row) => (
            <View key={row.week} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{row.week}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.activities.join(', ')}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.runVolume}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.targetTime}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.targetBenefit}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.targetHRZone}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="mt-4">
      <h3>Training Program</h3>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
      </table>

      <div className="mt-4">
        <CSVLink data={csvData} filename="training-program.csv" className="btn btn-primary me-2">
          Download as CSV
        </CSVLink>
        <PDFDownloadLink
          document={<MyDocument />}
          fileName="training-program.pdf"
          className="btn btn-secondary"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download as PDF'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Results;