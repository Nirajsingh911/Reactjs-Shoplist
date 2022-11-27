import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Emplisting = () => {
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();


  const LoadDetail = (id) => {
    navigate("/employee/detail/" + id);
  }
  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);

  }
  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove')) {
      fetch("http://localhost:8000/employee/" + id, {
        method: "DElETE",

      }).then((res) => {
        alert("Removed successfully")
        window.location.reload();
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }


  useEffect(() => {
    fetch("http://localhost:8000/employee").then((res) => {
      return res.json();
    }).then((resp) => {
      empdatachange(resp);
    }).catch((err) => {
      console.log(err.message);
    })

  }, [])


  const [query, setQuery] = useState(null);
  console.log(query);
  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col-md-12 mt-3 mb-3'>
          <h3 className='mb-3'> Filter  </h3>
          <div className='col-md-6'>
            <input type="text"  className='searchbar' placeholder='search...' 
            onChange={e => setQuery(e.target.value)}/>
          </div>
        </div>
      </div>





      <div className='card'>
        <div className='card-title'>
          <h2>shop listing</h2>
        </div>
        <div className='card-body'>
          <div className='divbtn'>
            <Link to="/employee/create" className='btn btn-success'>Add New (+)</Link>
          </div>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <td> ID </td>
                <td>  Shop Name </td>
                <td> Area Of  Shop</td>
                <td> Category </td>
                <td> Action</td>

              </tr>
            </thead>
            <tbody>

              

              {empdata &&
              empdata.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.shopname}</td>
                    <td>{item.area}</td>
                    <td>{item.category}</td>
                    <td><a onClick={() => { LoadEdit(item.id) }} className='btn btn-success'>Edit</a>
                      <a onClick={() => { Removefunction(item.id) }} className='btn btn-danger'>Remove</a>
                      <a onClick={() => { LoadDetail(item.id) }} className='btn btn-primary'>Details</a>
                    </td>
                  </tr>

                ))
              }


            </tbody>

          </table>
          <label> Sort By </label>
          <select className='dropdown' name='colValue' >
            <option>Plese select</option>
            <option value="name">Name</option>
            <option value="email">email</option>

          </select>
          <button className='btn btn-reset' >Reset</button>
          <br />
        </div>
      </div>

    </div>
  )
}

export default Emplisting;