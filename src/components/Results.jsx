import React, { useMemo } from 'react';
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
  // Parse the results into a structured training plan
  const parseTrainingPlan = (results) => {
    if (!results) return [];

    const trainingPlan = [];

    // Split the results into weeks
    const weeks = results.split('Week ');
    weeks.slice(1).forEach((week, weekIndex) => {
      const [, activities] = week.split(':\n');
      activities.split('\n').forEach((activity, dayIndex) => {
        const trimmedActivity = activity.trim();
        if (trimmedActivity) {
          // Extract activity details (e.g., "Day 1: Easy run - 5 km, 70% of max HR, 30 minutes, Endurance")
          const [, activityDetails] = trimmedActivity.split(': ');
          if (activityDetails) {
            const [activityType, ...details] = activityDetails.split(' - ');
            const [distance, goalHR, goalTime, trainingFocus] = details[0].split(', ');

            trainingPlan.push({
              week: weekIndex + 1,
              day: dayIndex + 1,
              distance: distance.replace(' km', '').trim(),
              activity: activityType.trim(),
              goalHR: goalHR || '',
              goalTime: goalTime || '',
              trainingFocus: trainingFocus || '',
            });
          }
        }
      });
    });

    return trainingPlan;
  };

  // Use useMemo to avoid recalculating data on every render
  const data = useMemo(() => parseTrainingPlan(results), [results]);

  const columns = [
    {
      header: 'Week',
      accessorKey: 'week',
    },
    {
      header: 'Day',
      accessorKey: 'day',
    },
    {
      header: 'Distance (km)',
      accessorKey: 'distance',
    },
    {
      header: 'Activity',
      accessorKey: 'activity',
    },
    {
      header: 'Goal HR',
      accessorKey: 'goalHR',
    },
    {
      header: 'Goal Time',
      accessorKey: 'goalTime',
    },
    {
      header: 'Training Focus',
      accessorKey: 'trainingFocus',
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
    Day: row.day,
    'Distance (km)': row.distance,
    Activity: row.activity,
    'Goal HR': row.goalHR,
    'Goal Time': row.goalTime,
    'Training Focus': row.trainingFocus,
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
            <View key={`${row.week}-${row.day}`} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{row.week}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.day}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.distance} km</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.activity}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.goalHR}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.goalTime}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.trainingFocus}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  if (!results) {
    return <div>No training program available.</div>;
  }

  return (
    <div className="mt-4">
      <h3>Training Plan</h3>
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
        <CSVLink data={csvData} filename="training-plan.csv" className="btn btn-primary me-2">
          Download as CSV
        </CSVLink>
        <PDFDownloadLink
          document={<MyDocument />}
          fileName="training-plan.pdf"
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