import { useState } from 'react';
import {Offcanvas, Accordion}   from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

function App() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);


  const [formData, setFormData] = useState({
    titolo:'',
    luogo:'',
    data:'',
    immagine: null,
    descrizione: '',
  })

  const [items, setItems] = useState([]);

  const handleChange = (e)=>{
    const { name, value, type, files} = e.target;
    setFormData ({
      ...formData,
      [name]: type === 'file' ? files[0]: value,
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    setItems([...items, formData]);

    setFormData({
      titolo:'',
      luogo:'',
      data:'',
      immagine: null,
      descrizione: '',
    });
  };

  console.log(items);

  return (
    <>
      
      <main className='container py-4 global-text'>
        <div className='pb-5 d-flex justify-content-between align-items-center'>
          <h1 className='fw-semibold'>Pianifica il tuo viaggio</h1>
          <div>
            <button onClick={handleShowOffCanvas} className='btn-default btn-meta'>
              Aggiungi meta
            </button>

          </div>
          
          <Offcanvas className="offcanvas-container" show={showOffCanvas} onHide={handleCloseOffCanvas} placement='end'>
            <Offcanvas.Header className='offcanvas-header p-0' closeButton>
              <h3 className='p-0 m-0'>Aggiungi meta</h3>

            </Offcanvas.Header>
            <Offcanvas.Body className='p-0'>
              <div className="form-container global-input-title  global-input">
                <form onSubmit={handleSubmit}>
                  <h5>Titolo</h5>
                  <input className='w-100' type="text" name='titolo' value={formData.titolo} onChange={handleChange} />

                  <h5>Luogo</h5>
                  <input className='w-100' type="text" name='luogo' value={formData.luogo} onChange={handleChange}/>
                  
                  <h5>Data</h5>
                  <input type="date" name='data' value={formData.data} onChange={handleChange}/>

                  
                  <h5>Immagine</h5>
                  <input className='w-100' type="file" name='immagine' value={formData.immagine} onChange={handleChange}/>

                 
                  <h5>Descrizione</h5>
                  <textarea rows={4} className="w-100 d-block" name="descrizione" value={formData.descrizione} onChange={handleChange}></textarea>

                  <button type='submit' className='btn-default btn-form'>Aggiungi</button>
                </form>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      
        <div className="cal-map-container m-0 mb-5  row g-4">
          <div className="col-4 m-0 ps-0"><div className="Calendar h-100">Calendario</div></div>
          <div className="col-8  m-0 pe-0"><div className="Map h-100">Mappa</div></div>
        </div>
        <div>
        <Accordion className='pb-4'>
          {items.map((item,index) =>(
          <Accordion.Item eventKey={index} className='accordion-item'>
            <Accordion.Header className='custon-accordion-header'>  
              <label className="accordion-checkbox-container">
                <input className='accordion-checkbox' type="checkbox" />
                <span className="custom-checkbox"></span>
              </label>
              <h5 className='mb-0'>{item.titolo}</h5>
            </Accordion.Header>
            <Accordion.Body  className='d-flex'>
              
              <div className="img-travel-container me-3">
                <img src={item.immagine}/>
              </div>
              
              
              <div className='d-flex descr-btn-containter '>
                <div className='Description me-2  flex-grow-1'>
                  <p className=" mb-auto">{item.descrizione}</p>
                </div>
                <div className='d-flex  flex-column'>
                  <button className="mb-auto acc-default-btn edit-btn"><MdEdit /></button>
                  {/* <button className="mb-auto acc-default-btn edit-btn"><FaSave /></button> */}
                  <button className="acc-default-btn delete-btn"><MdDelete /></button>
                </div>
              </div>
              
            </Accordion.Body>
          </Accordion.Item>
          ))}
          <Accordion.Item eventKey="1" className='accordion-item'>
            <Accordion.Header className='custon-accordion-header'>  
              <label className="accordion-checkbox-container">
                <input className='accordion-checkbox' type="checkbox" />
                <span className="custom-checkbox"></span>
              </label>
              <h5 className='mb-0'>Titolo</h5>
            </Accordion.Header>
            <Accordion.Body  className='d-flex'>
              
              <div className="img-travel-container me-3 ">
                <img src="https://store-images.s-microsoft.com/image/apps.30323.14537704372270848.6ecb6038-5426-409a-8660-158d1eb64fb0.08703491-f5dc-4b00-bca6-486b7b293c17?q=90&w=480&h=270" alt="img" className="img-travel"/>
              </div>
              
              
              <div className='d-flex descr-btn-containter '>
                <div className='Description flex-grow-1 me-2'>
                  <p className=" mb-auto"> quaerat in!</p>
                </div>
                <div className='d-flex  flex-column'>
                  <button className="mb-auto acc-default-btn edit-btn"><MdEdit /></button>
                  {/* <button className="mb-auto acc-default-btn edit-btn"><FaSave /></button> */}
                  <button className="acc-default-btn delete-btn"><MdDelete /></button>
                </div>
              </div>
              
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        
          

        </div>
      </main>
    </>
  )
}

export default App
