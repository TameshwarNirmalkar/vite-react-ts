import { Header } from 'components/Header';
import { PractitionerDetails } from 'components/PractitionerDetails';
import { useEffect, useState } from 'react';
import { getAppointments, getPractitioners } from 'service/rest_api';
import {
  createDateGroups,
  dataBetweenTwoDates,
  filterDataByPractitionerId,
  groupArrays,
  sortByDate,
} from 'utils/common.utils';

interface PractionersI {
  id: number;
  name: string;
}

interface AppointmentsI {
  id: number;
  revenue: number;
  cost: number;
  practitioner_id: number;
  date: string;
  monthName?: string;
  list?: Array<any>;
}

// interface FormState {
//   practitioner_id: number;
//   fromDate: string;
//   toDate: string;
// }

function App() {
  const [practionerList, setPractionerList]: Array<any> = useState([]);
  const [appointmentList, setAppointmentList]: Array<any> = useState([]);
  const [filteredAppointmentList, setFilteredAppointmentList]: Array<any> = useState([]);
  const [practitionerName, setPractitionerName] = useState('Summary');

  const [appointmentDetails, setAppointmentDetails]: any = useState(null);

  const [formState, setFormState] = useState({
    practitioner_id: 0,
    fromDate: '',
    toDate: '',
  });

  const getPractitionersApi = async () => {
    const res: Array<PractionersI> = await getPractitioners();
    setPractionerList(res);
  };

  const getAppointmentsApi = async () => {
    const res: Array<AppointmentsI> = await getAppointments();
    setAppointmentList(res);
    const data = createDateGroups(res);
    setFilteredAppointmentList(groupArrays(data));
  };

  useEffect(() => {
    getPractitionersApi();
    getAppointmentsApi();
    return () => {
      console.log('Unmount');
    };
  }, []);

  const onRowClick = (item: AppointmentsI) => {
    console.log(sortByDate(item.list));

    setAppointmentDetails(item);
  };

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onGenerateReport = () => {
    const { practitioner_id, fromDate, toDate } = formState;
    const practitionerObj = practionerList.find((el: any) => el.id === Number(practitioner_id));
    setPractitionerName(practitionerObj.name);
    const dataBetweenDates = dataBetweenTwoDates(appointmentList, fromDate, toDate);
    const getPractitionerData = filterDataByPractitionerId(
      dataBetweenDates,
      Number(practitioner_id)
    );
    const dateGroup = createDateGroups(getPractitionerData);
    const filterData = groupArrays(dateGroup);
    setFilteredAppointmentList(filterData);
    setAppointmentDetails(null);
  };

  return (
    <div className="App">
      <Header title="Practitioner" />
      <div className="container my-4">
        <div className="container">
          <div className="row align-items-end">
            <div className="col">
              <label className="form-label">Practitioner</label>
              <select
                className="form-select"
                placeholder="Choose Practitioner"
                name="practitioner_id"
                onChange={(e) => onHandleChange(e)}
              >
                <option value="">Select Practitioner</option>
                {practionerList.map((el: PractionersI, i: number) => (
                  <option key={i} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-control"
                name="fromDate"
                onChange={(e) => onHandleChange(e)}
              />
            </div>
            <div className="col">
              <label className="form-label">To Date</label>
              <input
                type="date"
                className="form-control"
                name="toDate"
                onChange={(e) => onHandleChange(e)}
              />
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-primary text-dark"
                onClick={() => onGenerateReport()}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="card">
          <div className="card-header">
            <strong>{practitionerName}</strong>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>
                    <strong>Month</strong>
                  </th>
                  <th>
                    <strong>Cost</strong>
                  </th>
                  <th>
                    <strong>Revenue</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointmentList.map((el: AppointmentsI, i: number) => (
                  <tr key={i} onClick={() => onRowClick(el)} role="button">
                    <td>{el.monthName}</td>
                    <td>{el.cost}</td>
                    <td>{el.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <PractitionerDetails data={appointmentDetails} key={appointmentDetails} /> */}
      <div className="container my-4">
        <div className="card">
          <div className="card-header">
            <strong>Practitioner Appointment Details</strong>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>
                    <strong>Date</strong>
                  </th>
                  <th>
                    <strong>Client Name</strong>
                  </th>
                  <th>
                    <strong>Appointment Type</strong>
                  </th>
                  <th>
                    <strong>Duration</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointmentDetails?.list?.map((el: any, i: number) => (
                  <tr key={i}>
                    <td>{el.date}</td>
                    <td>{el.client_name}</td>
                    <td>{el.appointment_type}</td>
                    <td>{el.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
