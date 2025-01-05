import React from 'react';

const Results = ({ results }) => {
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

  return (
    <div className="mt-4">
      <h3>Training Program</h3>
      {trainingProgram.map(({ week, activities }) => (
        <div key={week} className="card mb-3">
          <div className="card-header">{week}</div>
          <ul className="list-group list-group-flush">
            {activities.map((activity, index) => (
              <li key={index} className="list-group-item">
                {activity.replace('- ', '')}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Results;