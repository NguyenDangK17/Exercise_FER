import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

function StaffList() {
    
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "https://6498ff0079fbe9bcf83e8c5f.mockapi.io/staffManagement"
            );
            setStaffs(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <div className='StaffList'>
            <Container>
                <h1 className='text-center mt-4'>Staff List</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Age</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs
                        .map((staff) => (
                            <tr>
                                <td>{staff.name}</td>
                                <td>{staff.address}</td>
                                <td>{staff.age}</td>
                                <td><img src ={staff.avatar}/></td>
                            </tr>
                        ))}
                        
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default StaffList;