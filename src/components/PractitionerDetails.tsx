export const PractitionerDetails = (data: any) => (
  <div className="container my-4">
    <div className="card">
      <div className="card-header">
        <strong>Practitioner Details</strong>
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
            {data?.list?.map((el: any, i: number) => (
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
);
