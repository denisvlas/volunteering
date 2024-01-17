import React, { useContext, useEffect } from 'react';
import c from "../pages/evenimente/Eveniment.module.css";
import { SectionContext } from '../pages/evenimente/context';
import { Transactions } from '../pages/evenimente/models';

interface Props {
  data: Data[] 
}

interface Data {
  data: string;
  suma: string;
  organizatie: string;
}

function HistoryTransactions({ data }: Props): JSX.Element {
  // Creează o copie a array-ului de date pentru a nu afecta starea originală
  const reversedData = data.slice().reverse();

  return (
    <div>
      <div className={c.transactions}>
        <table className={c['my-table']}>
          <tbody>
            <tr className={`${c['transactions-header']} table-primary`}>
              <th>Sponsor</th>
              <th>Suma</th>
              <th>Data</th>
            </tr>
            {reversedData.map((t: Data, index: number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'table-primary' : 'table-secondary'}
              >
                <td>{t.organizatie}</td>
                <td className={c.suma}>+ {t.suma}MDL</td>
                <td>{t.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTransactions;
