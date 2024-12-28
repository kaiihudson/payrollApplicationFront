"use server";

export default async function PeopleList({people}: any): Promise<any> {
  const data = await fetch("http://localhost:8080/api/v1/people");
  const peopleResponse = await data.json();
  return (
    <div>
      <ul>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {peopleResponse._embedded.personList.map((person: any) => (
              <tr key={person.id}>
                <td>
                  {person.firstName} {person.lastName}
                </td>
                <td>{person.phoneNum}</td>
                <td>{person.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>
    </div>
  );
}
