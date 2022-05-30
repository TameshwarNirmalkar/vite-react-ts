import { Header } from 'components/Header';
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
      <Header title="Practitioner" />
      <div className="container my-4">
        <div className="card">
          <div className="card-body">
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
      </div>
    </div>
  );
}

export default App;
