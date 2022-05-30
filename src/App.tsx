import { useEffect, useState } from 'react';
import { getPractitioners } from 'service/rest_api';

interface PractionersI {
  id: number;
  name: string;
}

function App() {
  const [practionerList, setPractionerList]: any = useState([]);

  const getPractitionersApi = async () => {
    const res: Array<PractionersI> = await getPractitioners();
    setPractionerList(res);
  };

  useEffect(() => {
    getPractitionersApi();
    return () => {
      console.log('Unmount');
    };
  }, []);

  const onRowClick = (item: PractionersI) => {
    console.log(item);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            className="bi bi-activity"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
            />
          </svg>
        </div>
      </nav>
      <div className="container my-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <strong>#ID</strong>
              </th>
              <th>
                <strong>Name</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {practionerList.map((el: PractionersI, i: number) => (
              <tr key={i} onClick={() => onRowClick(el)} role="button">
                <td>{el.id}</td>
                <td>{el.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
