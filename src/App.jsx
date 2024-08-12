import { useState } from 'react';
import {Offcanvas, Accordion}   from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

function App() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

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
                <form action="">
                  <h5>Titolo</h5>
                  <input className='w-100' type="text" />

                  <h5>Luogo</h5>
                  <input className='w-100' type="text" />
                  
                  <h5>Data</h5>
                  <input type="date" />

                  
                  <h5>Immagine</h5>
                  <input type="file"  className='w-100'/>

                 
                  <h5>Descrizione</h5>
                  <textarea  rows={4} className='w-100 d-block' name="" id=""></textarea>

                  <button className='btn-default btn-form'>Aggiungi</button>
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
          <Accordion.Item eventKey="0" className='accordion-item'>
            <Accordion.Header className='custon-accordion-header'>  
              <label className="accordion-checkbox-container">
                <input className='accordion-checkbox' type="checkbox" />
                <span className="custom-checkbox"></span>
              </label>
              <h5 className='mb-0'>Titolo</h5>
            </Accordion.Header>
            <Accordion.Body  className='d-flex'>
              
              <div className="img-travel-container me-3">
                <img src="https://store-images.s-microsoft.com/image/apps.30323.14537704372270848.6ecb6038-5426-409a-8660-158d1eb64fb0.08703491-f5dc-4b00-bca6-486b7b293c17?q=90&w=480&h=270" alt="img" className="img-travel"/>
              </div>
              
              
              <div className='d-flex descr-btn-containter '>
                <div className='Description me-2'>
                  <p className=" mb-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, voluptas quaerat distinctio itaque consequuntur veritatis voluptatibus et, repellat voluptate consectetur iusto commodi iste obcaecati error eligendi sint amet laudantium porro?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quae culpa aliquam! Cupiditate totam quos, aliquam earum impedit modi quo asperiores officia, aspernatur, tempore nobis animi necessitatibus hic quaerat in!</p>
                </div>
                <div className='d-flex  flex-column'>
                  <button className="mb-auto acc-default-btn edit-btn"><MdEdit /></button>
                  {/* <button className="mb-auto acc-default-btn edit-btn"><FaSave /></button> */}
                  <button className="acc-default-btn delete-btn"><MdDelete /></button>
                </div>
              </div>
              
            </Accordion.Body>
          </Accordion.Item>
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
                <div className='Description me-2'>
                  <p className=" mb-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, voluptas quaerat distinctio itaque consequuntur veritatis voluptatibus et, repellat voluptate consectetur iusto commodi iste obcaecati error eligendi sint amet laudantium porro?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quae culpa aliquam! Cupiditate totam quos, aliquam earum impedit modi quo asperiores officia, aspernatur, tempore nobis animi necessitatibus hic quaerat in!</p>
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
