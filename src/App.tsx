import { Header } from 'components/Header';
import { useEffect, useState } from 'react';
import { getAppointments, getPractitioners } from 'service/rest_api';

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
}

function App() {
  const [practionerList, setPractionerList]: Array<any> = useState([]);
  const [appointmentList, setAppointmentList]: Array<any> = useState([]);

  const getPractitionersApi = async () => {
    const res: Array<PractionersI> = await getPractitioners();
    setPractionerList(res);
  };

  const getAppointmentsApi = async () => {
    const res: Array<AppointmentsI> = await getAppointments();
    setAppointmentList(res);
  };

  useEffect(() => {
    getPractitionersApi();
    getAppointmentsApi();
    return () => {
      console.log('Unmount');
    };
  }, []);

  const onRowClick = (item: AppointmentsI) => {
    console.log(item);
  };

  return (
    <div className="App">
      <Header title="Practitioner" />
      <div className="container my-4">
        <div className="container">
          <div className="row align-items-end">
            <div className="col">
              <label className="form-label">Practitioner</label>
              <select className="form-select" placeholder="Choose Practitioner">
                {practionerList.map((el: PractionersI, i: number) => (
                  <option key={i} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label">From</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col">
              <label className="form-label">To</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col">
              <button type="button" className="btn btn-primary text-dark">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>
                    <strong>Date</strong>
                  </th>
                  <th>
                    <strong>Revenue</strong>
                  </th>
                  <th>
                    <strong>Cost</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointmentList.map((el: AppointmentsI, i: number) => (
                  <tr key={i} onClick={() => onRowClick(el)} role="button">
                    <td>{el.date}</td>
                    <td>{el.revenue}</td>
                    <td>{el.cost}</td>
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
