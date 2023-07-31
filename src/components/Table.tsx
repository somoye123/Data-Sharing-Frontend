import styled from 'styled-components';

import { User } from '../types/Sx';

interface TableProps {
  data: Array<User> | null;
}

/**
 * Table component.
 *
 * @returns {JSX.Element} The rendered Table component.
 */

const Table = ({ data }: TableProps): JSX.Element => {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Number of Users</th>
          <th>Number of Products</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map(({ companyDetails, uid }) => (
            <tr key={uid}>
              <td>{companyDetails ? companyDetails?.companyName : ''}</td>
              <td>{companyDetails ? companyDetails?.numUsers : ''}</td>
              <td>{companyDetails ? companyDetails?.numProducts : ''}</td>
              <td>{companyDetails ? companyDetails?.percentage : ''}</td>
            </tr>
          ))}
      </tbody>
    </TableWrapper>
  );
};

export default Table;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
  th,
  td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    height: 1rem;
  }
  th {
    background-color: #f2f2f2;
  }
`;
