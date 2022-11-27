import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EmpDetail = () => {
  const { empid } = useParams();

  const [empdata, empdatachange] = useState({})

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid).then((res) => {
      return res.json();
    }).then((resp) => {
      empdatachange(resp);
    }).catch((err) => {
      console.log(err.message);
    })

  }, []);

  return (
    <div>
      <div className='card' style={{ " textAlign ":"left "}}>
        <div className='card-title'>
          <h2>Shop Details</h2>
        </div>
        <div className='card-body'></div>
      </div>
      {empdata &&
        <div>
<table>
<tr>
    <td>Shop Id :</td>
    <td>{empdata.id}</td>
    
  </tr>
  <tr>
    <td>Shop Name :</td>
    <td>{empdata.shopname}</td>
    
  </tr>
 
  <tr>
    <td>Area :</td>
    <td>{empdata.area}</td>
    
  </tr>
  <tr>
    <td>Category</td>
    <td>{empdata.category}</td>
    
  </tr>
<tr>
  <br></br><Link className='btn btn-danger' to ="/"> Back to Listing</Link>
</tr>
</table>

        </div>
      }
    </div>
  )
}

export default EmpDetail