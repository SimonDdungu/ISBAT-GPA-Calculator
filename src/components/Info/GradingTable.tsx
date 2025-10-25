// components/GradingTable.js
import React from 'react';

const GradingTable = () => {
  const grades = [
    { marks: '90 - 100', letter: 'A+', gp: 5, interpretation: 'Exceptional' },
    { marks: '80 - 89', letter: 'A', gp: 5, interpretation: 'Excellent' },
    { marks: '75 - 79', letter: 'B+', gp: 4.5, interpretation: 'Very Good' },
    { marks: '70 - 74', letter: 'B', gp: 4, interpretation: 'Good' },
    { marks: '65 - 69', letter: 'C+', gp: 3.5, interpretation: 'Fairly Good' },
    { marks: '60 - 64', letter: 'C', gp: 3, interpretation: 'Fair' },
    { marks: '55 - 59', letter: 'D+', gp: 2.5, interpretation: 'Pass' },
    { marks: '50 - 54', letter: 'D', gp: 2, interpretation: 'Marginal Pass' },
    { marks: '45 - 49', letter: 'E', gp: 1.5, interpretation: 'Marginal Fail' },
    { marks: '40 - 44', letter: 'E-', gp: 1, interpretation: 'Clear Fail' },
    { marks: 'Below 40', letter: 'F', gp: 0, interpretation: 'Bad Fail' },
  ];

  return (
     <div className="overflow-x-auto text-sm">
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">Total Score (%)</th>
            <th className="px-2 lg:px-4 py-2 text-left text-gray-700 font-medium">Letter Grade</th>
            <th className="px-2 lg:px-4 py-2 text-left text-gray-700 font-medium">Points</th>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">Interpretation</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {grades.map((grade, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{grade.marks}</td>
              <td className="px-2 lg:px-4 py-2">{grade.letter}</td>
              <td className="px-2 lg:px-4 py-2">{grade.gp}</td>
              <td className="px-4 py-2">{grade.interpretation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradingTable;
