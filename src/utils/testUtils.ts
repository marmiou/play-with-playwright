
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'passed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'failed':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'running':
      return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
    default:
      return <Clock className="h-5 w-5 text-gray-400" />;
  }
};
