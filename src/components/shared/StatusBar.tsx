import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import RejectionModal from './RejectionModal';

interface StatusBarProps {
  currentStage: number;
  status: string;
  className?: string;
  showDetails?: boolean;
  onUpdateStatus?: (newStatus: string, reason?: string) => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  currentStage, 
  status,
  className = '',
  showDetails = true,
  onUpdateStatus
}) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  
  // Pipeline stages shown in the UI
  const stages = ['Submitted', 'Screening', 'Interview', 'Technical', 'Offer', 'Accepted'];

  // Map pipeline stages to status
  const getStatusForStage = (stage: number): string => {
    switch (stage) {
      case 0: return 'submitted';
      case 5: return 'hired';
      default: return 'in-progress';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'in-progress': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAdvance = () => {
    if (!onUpdateStatus) return;
    
    const nextStage = currentStage + 1;
    const newStatus = getStatusForStage(nextStage);
    onUpdateStatus(newStatus);
  };

  const handleReject = (reason: string) => {
    if (!onUpdateStatus) return;
    onUpdateStatus('rejected', reason);
    setShowRejectionModal(false);
  };

  const rejectedStage = status === 'rejected' ? currentStage : -1;

  return (
    <>
      <div className={`relative ${className}`}>
        <div className="absolute top-2 left-0 w-full h-0.5 bg-gray-200"></div>
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const isCompleted = currentStage > index;
            const isCurrent = currentStage === index;
            const isRejected = rejectedStage === index;
            
            return (
              <div key={stage} className="flex flex-col items-center relative">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-4 h-4 rounded-full ${
                      isRejected ? 'bg-red-500' :
                      isCompleted || isCurrent ? getStatusColor(status) : 'bg-gray-200'
                    } relative z-10`}
                  />
                  {showDetails && (
                    <div className="mt-2 text-xs font-medium text-gray-500">{stage}</div>
                  )}
                </div>
                
                {isCurrent && status !== 'rejected' && status !== 'hired' && onUpdateStatus && (
                  <div className="absolute -bottom-8 flex space-x-2">
                    <button
                      onClick={handleAdvance}
                      className="p-1 bg-green-100 rounded-full text-green-600 hover:bg-green-200"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowRejectionModal(true)}
                      className="p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div 
          className={`absolute top-2 left-0 h-0.5 transition-all duration-500 ${getStatusColor(status)}`}
          style={{ 
            width: `${currentStage >= 0 ? (currentStage / (stages.length - 1)) * 100 : 0}%`,
          }}
        />
      </div>

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onReject={handleReject}
      />
    </>
  );
};

export default StatusBar;