import practitionersData from '../assets/mock_data/practitioners.json';
import appointmentsData from '../assets/mock_data/appointments.json';

const getAppointments = () => {
  return appointmentsData;
};

const getPractitioners = () => {
  return practitionersData;
};

export { getAppointments, getPractitioners };
