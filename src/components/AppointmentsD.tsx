import React from 'react';
import { ChevronRight } from 'lucide-react';
import Card from './CardD';

interface Appointment {
  id: string;
  patientName: string;
  type: string;
}
interface AppointmentsProps {
  appointments: Appointment[];
}

const Appointments: React.FC<AppointmentsProps> = ({ appointments }) => {
  return (
    <Card title="Today's appointments">
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id} 
            className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{appointment.patientName}</h3>
                <p className="text-gray-600">{appointment.type}</p>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-2">{appointment.type}</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Appointments;