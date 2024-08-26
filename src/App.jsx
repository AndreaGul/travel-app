import { useEffect, useState } from 'react';
import { Offcanvas, Accordion } from 'react-bootstrap';
import { MdDelete, MdEdit } from "react-icons/md";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TomTomMap from './Map';

function App() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

  const [formData, setFormData] = useState({
    titolo: '',
    luogo: '',
    data: '',
    descrizione: '',
    isChecked: false,
  });
  const [immagine, setImmagine] = useState(null);

  const [formErrors, setFormErrors] = useState({ titolo: '', data: '' });

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : {};
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredItems, setFilteredItems] = useState([]);

  const [address, setAddress] = useState(null);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const today = new Date();
    onDateChange(today);
  }, []);

  useEffect(() => {
    setFilteredItems(items[selectedDate] || []);
  }, [items, selectedDate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    try {
      const base64Image = await convertToBase64(file);
      setImmagine(base64Image);
    } catch (error) {
      console.error("Errore nella conversione dell'immagine", error);
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { titolo: '', data: '' };
  
    if (!formData.titolo) {
      newErrors.titolo = 'Il titolo è obbligatorio';
      valid = false;
    }
  
    if (!formData.data) {
      newErrors.data = 'La data è obbligatoria';
      valid = false;
    }
  
    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Se il modulo non è valido, interrompe la sottomissione
    }

    const newItem = { ...formData, immagine };
    const dateKey = formData.data;

    setItems((prevItems) => {
      const updatedItems = { ...prevItems };

      if (isEditing) {
        updatedItems[dateKey][currentEditIndex] = newItem;
        setIsEditing(false);
        setCurrentEditIndex(null);
      } else {
        if (!updatedItems[dateKey]) {
          updatedItems[dateKey] = [];
        }
        updatedItems[dateKey].push(newItem);
      }

      return updatedItems;
    });

    handleCloseOffCanvas();
    setFormData({
      titolo: '',
      luogo: '',
      data: '',
      descrizione: '',
      isChecked: false,
    });
    setImmagine(null);
  };

  const handleDelete = (indexD) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[selectedDate].splice(indexD, 1);

      if (updatedItems[selectedDate].length === 0) {
        delete updatedItems[selectedDate];
      }

      return updatedItems;
    });
  };

  const handleEdit = (indexE) => {
    const itemToEdit = filteredItems[indexE];
    handleShowOffCanvas();

    setFormData({
      titolo: itemToEdit.titolo,
      luogo: itemToEdit.luogo,
      data: itemToEdit.data,
      descrizione: itemToEdit.descrizione,
      isChecked: itemToEdit.isChecked,
    });

    setImmagine(itemToEdit.immagine);
    setIsEditing(true);
    setCurrentEditIndex(indexE);
  };

  const handleCheckboxChange = (index) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[selectedDate][index].isChecked = !updatedItems[selectedDate][index].isChecked;
      return updatedItems;
    });
  };

  const onDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
    setFilteredItems(items[formattedDate] || []);
  };

  const handleAccordionClick = (index) => {
    const address = filteredItems[index]?.luogo;
    if (address) {
      setAddress(address);
    }
  };

  console.log(items);
  console.log(filteredItems);

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
              <h3 className='p-0 m-0'>{isEditing ? 'Modifica' : 'Aggiungi meta'}</h3>
            </Offcanvas.Header>
            <Offcanvas.Body className='p-0'>
              <div className="form-container global-input-title  global-input">
                <form onSubmit={handleSubmit}>
                  <h5>Titolo</h5>
                  <input className='w-100' type="text" name='titolo' value={formData.titolo} onChange={handleChange} />
                  {formErrors.titolo && <p className="text-danger">{formErrors.titolo}</p>}

                  <h5>Luogo</h5>
                  <input className='w-100' type="text" name='luogo' value={formData.luogo} onChange={handleChange} />

                  <h5>Data</h5>
                  <input type="date" name='data' value={formData.data} onChange={handleChange} />
                  {formErrors.data && <p className="text-danger">{formErrors.data}</p>}

                  <h5>Immagine</h5>
                  <input className='w-100' type="file" name='immagine' onChange={handleFileChange} />

                  <h5>Descrizione</h5>
                  <textarea rows={4} className="w-100 d-block" name="descrizione" value={formData.descrizione} onChange={handleChange}></textarea>

                  <button type='submit' className='btn-default btn-form'>{isEditing ? 'Conferma' : 'Aggiungi'}</button>
                </form>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>

        <div className="cal-map-container m-0 mb-5 row g-4">
          <div className="col-4 m-0 ps-0">
            <div className="Calendar h-100">
              <Calendar onChange={onDateChange} value={selectedDate} />
            </div>
          </div>
          <div className="col-8 m-0 pe-0">
            <div className="Map h-100">
              <TomTomMap address={address} />
            </div>
          </div>
        </div>
        <div>
          {filteredItems.length > 0 ? (
            <Accordion className='pb-4'>
              {filteredItems.map((item, index) => (
                <Accordion.Item eventKey={index} className='accordion-item'>
                  <Accordion.Header
                    className='custon-accordion-header'
                    onClick={() => handleAccordionClick(index)}
                  >
                    <label className="accordion-checkbox-container">
                      <input
                        className='accordion-checkbox'
                        type="checkbox"
                        checked={item.isChecked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <span className="custom-checkbox"></span>
                    </label>
                    <h5 className='mb-0'>{item.titolo}</h5>
                  </Accordion.Header>
                  <Accordion.Body className='d-flex'>
                    <div className="img-travel-container me-3">
                      <img src={item.immagine} alt={item.titolo} />
                    </div>
                    <div className='d-flex descr-btn-containter'>
                      <div className='Description flex-grow-1 me-2'>
                        <p className="mb-auto">{item.descrizione}</p>
                      </div>
                      <div className='d-flex flex-column'>
                        <button onClick={() => handleEdit(index)} className="mb-auto acc-default-btn edit-btn"><MdEdit /></button>
                        <button onClick={() => handleDelete(index)} className="acc-default-btn delete-btn"><MdDelete /></button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <h5 className='no-meta-message'>Non hai mete per questa data.</h5>
          )}
        </div>
      </main>
    </>
  );
}

export default App;

