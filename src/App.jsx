import { useState } from 'react';
import  Offcanvas  from 'react-bootstrap/Offcanvas';

function App() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

  return (
    <>
      
      <main className='container py-3 global-text'>
        <div className='container-travel d-flex justify-content-between align-items-center'>
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
      

        <div className="cal-map-container">
          <div className="Calendar">Calendario</div>
          <div className="Map">Mappa</div>
        </div>
        <div>
          <div>
            <h5>Titolo</h5>
            <input type="checkbox" />
          </div>
          
          <div>
            <div className="img-travel-container">
              <img src="." alt="img" className="img-travel"/>
            </div>
            <p className="Description">Descrizione</p>
            <div>
              <button className="edit-btn">Modifica</button>
              <button className="delete-btn">Elimina</button>
            </div>
          </div>
          

        </div>
      </main>
    </>
  )
}

export default App
