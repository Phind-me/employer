import React from 'react';
import { Candidate } from '../../types';
import CandidatePipeline from '../shared/CandidatePipeline';

interface CandidatesStatusProps {
  candidates: Candidate[];
}

const CandidatesStatus: React.FC<CandidatesStatusProps> = ({ candidates }) => {
  const submittedCount = candidates.filter(c => c.status === 'submitted').length;
  const inProgressCount = candidates.filter(c => c.status === 'in-progress').length;
  const hiredCount = candidates.filter(c => c.status === 'hired').length;
  const rejectedCount = candidates.filter(c => c.status === 'rejected').length;
  const totalCount = candidates.length;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Candidate Pipeline</h2>
        <p className="mt-1 text-sm text-gray-500">
          Current status of {totalCount} candidates
        </p>
      </div>
      <div className="p-6">
        <CandidatePipeline
          submitted={submittedCount}
          inProgress={inProgressCount}
          hired={hiredCount}
          rejected={rejectedCount}
        />
      </div>
    </div>
  );
};

export default CandidatesStatus;