import {useEffect,useState}from 'react'
import {Link, useParams,useNavigate } from 'react-router-dom';

const EmpEdit = () => {

  const { empid } = useParams();

  //const [empdata, empdatachange] = useState({})

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid).then((res) => {
      return res.json();
    }).then((resp) => {
      idchange(resp.id);
       shopnamechange(resp.shopname);
      areachange(resp.area);
      categorychange(resp.category);
      activechange(resp.isactive);

    }).catch((err) => {
      console.log(err.message);
    })

  }, []);

  const [id, idchange] = useState("");
  const [shopname, shopnamechange] = useState("");
  const [area, areachange] = useState("");
  const [category, categorychange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(true);


  const navigate=useNavigate();


  const handlesubmit = (e) => {
      e.preventDefault();
     const empdata={  id,shopname, area, category, active };

     fetch("http://localhost:8000/employee/"+empid,{
      method:"PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
     }).then((res) =>{
      alert("saved successfully")
      navigate("/");
     }).catch((err)=>{
      console.log(err.message)
     })
  }


  return (
    <div>
        <div>
            <div className='row'>
                <div className='offset-lg-3 col-lg-6'>
                    <form className='container' onSubmit={handlesubmit}>

                        <div className='card' style={{ "textAlign": "left" }}>
                            <div className='card-title'>
                                <h2>Shop Edit</h2>

                            </div>
                            <div className='card-body'>

                                <div className='row'>

                                    <div className='col-lg-12'>
                                        <div className='form-group'>
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className='form-control'></input>
                                        </div>
                                    </div>
                                    <div className='col-lg-12'>
                                        <div className='form-group'>
                                            <label>Shop Name</label>
                                            <input required value={shopname} onMouseDown={e=>valchange} onChange={e => shopnamechange(e.target.value)} className='form-control'></input>
                                           {shopname.length ==0 && validation && <span className='text-danger' > Enter The Name </span> }
                                        </div>
                                    </div>

                                    <div className='col-lg-12'>
                                        <div className='form-group'>
                                            <label>Area</label>
                                            <select   checked={area} onChange={e => areachange(e.target.value)} className='form-control dropdown' required value={category} >
                                                <option value="{area}">{area}</option>
                                                <option value="Thane">Thane</option>
                                                <option value="Pune">Pune</option>
                                                <option value="Mumbai Suburban">Mumbai Suburban</option>
                                                <option value="Nashik">Nashik</option>
                                                <option value="Nagpur">Nagpur</option>
                                                <option value="Ahmednagar">Ahmednagar</option>
                                                <option value="Solapur">Solapur</option>
                                                <option value="Amrawati">Amrawati</option>
                                                </select>

                                        </div>
                                    </div>

                                    <div className='col-lg-12'>
                                        <div className='form-group'>
                                            <label>Category</label>
                                            <select   checked={category} onChange={e => categorychange(e.target.value)} className='form-control dropdown' >
                                                <option value="{category}">{category}</option>
                                                <option value="Grocery">Grocery</option>
                                                <option value="Chemist">Chemist</option>
                                                <option value="Stationary">Stationary</option>
                                                <option value="Butcher">Butcher</option>
                                                <option value="Fruits And Vegetables">Fruit And Vegetables</option>
                                                <option value="Mall">Mall</option>
                                                <option value="Gymnesium">Gymnesium</option>
                                                </select>
                                                </div>
                                    </div>


                                    <div className='col-lg-12'>
                                        <div className='form-check'>
                                            <input checked={shopname} onChange={e => shopnamechange(e.target.checked)} type="checkbox" className='form-check-input'></input>
                                            <label className='form-check-label'> Is Active</label>
                                        </div>
                                    </div>

                                    <div className='col-lg-12'>
                                        <div className='form-group'>
                                            <button className='btn btn-success' type='submit'>Save</button>
                                            <Link to="/" className='btn btn-danger' >Back </Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    


    </div>
  )
}

export default EmpEdit