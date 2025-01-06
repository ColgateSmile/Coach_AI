import React, { useState } from 'react';

const Results = ({ results }) => {
  const [expandedWeeks, setExpandedWeeks] = useState({});

  // Parse the training program into an array of weeks
  const parseTrainingProgram = (program) => {
    const weeks = program.split('Week ');
    return weeks.slice(1).map((week) => {
      const [weekNumber, activities] = week.split(':\n');
      return {
        week: `Week ${weekNumber.trim()}`,
        activities: activities.split('\n').filter((line) => line.trim()),
      };
    });
  };

  const trainingProgram = parseTrainingProgram(results);

  const toggleWeek = (week) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [week]: !prev[week],
    }));
  };

  return (
    <div className="mt-4">
      <h3>Training Program</h3>
      {trainingProgram.map(({ week, activities }) => (
        <div key={week} className="card mb-3">
          <div
            className="card-header d-flex justify-content-between align-items-center"
            onClick={() => toggleWeek(week)}
            style={{ cursor: 'pointer' }}
          >
            <span>{week}</span>
            <span>{expandedWeeks[week] ? '▲' : '▼'}</span>
          </div>
          {expandedWeeks[week] && (
            <ul className="list-group list-group-flush">
              {activities.map((activity, index) => (
                <li key={index} className="list-group-item">
                  {activity.replace('- ', '')}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Results;