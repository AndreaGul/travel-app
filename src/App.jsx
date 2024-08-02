import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

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
            <button onClick={handleShowOffCanvas} className='btn-meta'>
              Aggiungi meta
            </button>

          </div>
         
          <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Aggiungi meta</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="form-container  global-input">
                <form action="">
                  <h4>Luogo</h4>
                  <input type="text" />

                  <h4>Data</h4>
                  <input type="date" />

                  <h4>Titolo</h4>
                  <input type="text" />

                  <h4>img</h4>
                  <input type="file" />

                  <h4>Descrizione</h4>
                  <textarea name="" id=""></textarea>
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
