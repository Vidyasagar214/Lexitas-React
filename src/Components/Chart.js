import React from 'react'
import Chart from 'react-google-charts'
const ganttChartData = [
  [
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },
  ],
  [
    'Research',
    'Task 1 Development Phase-3',
    new Date(2022, 0, 1),
    new Date(2022, 2, 1),
    null,
    80,
    null,
  ],
  [
    'Write',
    'Task 2 Tsting Phase-2',
    new Date(2022, 3, 1),
    new Date(2022, 5, 1),
    null,
    20,
    null,
  ],
  [
    'Cite',
    'Task 3 UAT',
    new Date(2022, 2, 1),
    new Date(2022, 6, 5),
    null,
    50,
    null,
  ],
  [
    'Complete',
    'Task-1 Discovery',
    new Date(2022, 1, 1),
    new Date(2022, 4, 5),
    null,
    100,
    null,
  ],
  [
    'Outline',
    'Task 2 Development Phase-1',
    new Date(2022, 6, 1),
    new Date(2022, 12, 5),
    null,
    0,
    null,
  ],
]
function GanttChart(){

    return (
        <>
      <div className="container mt-5">
        <h2>React Gantt Chart </h2>
        <Chart
          width={'1100px'}
          height={'410px'}
          chartType="Gantt"
          loader={<div>Loading Chart</div>}
          data={ganttChartData}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
      </>
    )
  }

export default GanttChart