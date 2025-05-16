import React, { useEffect, useState } from 'react';
import PatientOverview from '../components/PatientOverviewD';
import CriticalValues from '../components/CriticalValuesD';
import Appointments from '../components/AppointmentsD';
import Statistics from '../components/StatisticsD';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import NavbarD from "./NavbarD.tsx";

interface Patient {
  id: string;
  name: string;
  age: number;
  height?: number;
  weight?: number;
  bmi?: string;
  status: string;
  action: string;
}

interface Appointment {
  id: string;
  patientName: string;
  type: string;
}

const DoctorDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const data: Patient[] = snapshot.docs.map(doc => {
        const d = doc.data();
        const height = d.height || 0;
        const weight = d.weight || 0;
        const bmi = height && weight ? (weight / ((height / 100) ** 2)).toFixed(1) : 'N/A';

        return {
          id: doc.id,
          name: d.ime || 'Nepoznato',
          age: d.birthDate ? calculateAge(d.birthDate) : 0,
          height,
          weight,
          bmi,
          status: d.profileCompleted ? 'Stable' : 'At Risk',
          action: d.profileCompleted ? 'Stable' : 'Complete Profile',
        };
      });
      setPatients(data);
    };

    const fetchAppointments = async () => {
      const snapshot = await getDocs(collection(db, 'appointments'));
      const data: Appointment[] = snapshot.docs.map(doc => doc.data() as Appointment);
      setAppointments(data);
    };

    fetchPatients();
    fetchAppointments();
  }, []);

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-8">
       <NavbarD />
      <h1 className="text-3xl font-bold text-gray-900 p-5">Doctor Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PatientOverview patients={patients} />
        <div className="space-y-8">
          <CriticalValues />
          <Appointments appointments={appointments} />
        </div>
      </div>

      <Statistics />
    </div>
  );
};

export default DoctorDashboard;
