import React, { useEffect, useState } from 'react';
import { Search, Calendar, Clock, FileText, Plus } from 'lucide-react';
import Card from '../components/CardD';
import { auth, db } from '../firebase/firebase.config';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

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
  const [showForm, setShowForm] = useState(false);

  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id' | 'doctorId'>>({
    patientName: '',
    date: '',
    time: '',
    type: 'Consultation',
    status: 'Scheduled',
    notes: ''
  });

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

  const handleAddAppointment = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = await addDoc(collection(db, 'appointments'), {
      ...newAppointment,
      doctorId: user.uid
    });

    setAppointments(prev => [...prev, { id: docRef.id, doctorId: user.uid, ...newAppointment }]);
    setNewAppointment({ patientName: '', date: '', time: '', type: 'Consultation', status: 'Scheduled', notes: '' });
    setShowForm(false);
  };

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          {showForm ? 'Cancel' : 'New Appointment'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Patient Name"
              className="border p-2 rounded w-full"
              value={newAppointment.patientName}
              onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            />
            <input
              type="time"
              className="border p-2 rounded w-full"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            />
            <select
              className="border p-2 rounded w-full"
              value={newAppointment.type}
              onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
            >
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Check-up">Check-up</option>
            </select>
            <select
              className="border p-2 rounded w-full"
              value={newAppointment.status}
              onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <textarea
            placeholder="Notes"
            className="border p-2 rounded w-full"
            rows={3}
            value={newAppointment.notes}
            onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
          ></textarea>
          <button
            onClick={handleAddAppointment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save Appointment
          </button>
        </div>
      )}

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
