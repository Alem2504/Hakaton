import React, { useEffect, useState } from 'react';
import {Search, Calendar, Clock, FileText, Plus} from 'lucide-react';
import Card from '../components/CardD';
import { auth, db } from '../firebase/firebase.config';
import { Link } from 'react-router-dom';
import Sidebar from '../components/NavbarD';

import { collection, query, where, getDocs } from 'firebase/firestore';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string;
  doctorId: string;
}


const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, 'appointments'),
        where('doctorId', '==', user.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-6">
        <Sidebar />
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <Link
  to="/createapp"
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors"
>
  <Plus className="h-5 w-5" />
  New Appointment
</Link>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-4">
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]">
              <option>All Types</option>
              <option>Follow-up</option>
              <option>Consultation</option>
              <option>Check-up</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{appointment.patientName}</h3>
                    <p className="text-gray-600">{appointment.type}</p>
                  </div>
                  <span className={`${getStatusColor(appointment.status)}`}>{appointment.status}</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{appointment.notes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Card title="Quick Actions">
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                View Calendar
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Manage Schedule
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Patient Records
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;