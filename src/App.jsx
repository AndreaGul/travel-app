import { useEffect, useState } from 'react';
import {Offcanvas, Accordion}   from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
function App() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);


  const [formData, setFormData] = useState({
    titolo:'',
    luogo:'',
    data:'',
    descrizione: '',
    isChecked: false,
  })
  const [immagine, setImmagine] = useState(null);

  const [items, setItems] = useState(()=>{
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null)


  const [selectedDate, setSelectedDate]= useState(new Date());
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(()=>{
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const today = new Date();
    onDateChange(today);
  }, []);

  useEffect(() => {
    const updatedItems = items.filter(item => item.data === selectedDate);
    setFilteredItems(updatedItems);
  }, [items, selectedDate]);
  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

  const handleChange = (e)=>{
    const { name, value} = e.target;
    setFormData ({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    try {
        const base64Image = await convertToBase64(file);
        setImmagine(base64Image)
    } catch (error) {
        console.error("Errore nella conversione dell'immagine", error);
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    const newItem = {...formData, immagine};

    if(isEditing){
      setItems(
        items.map((item,index)=>
        index === currentEditIndex ? newItem : item)
      )
      setIsEditing(false);
      setCurrentEditIndex(null);
      handleCloseOffCanvas();
    }
    else{
      setItems([...items, newItem]);   
    }

   
    setFormData({
      titolo:'',
      luogo:'',
      data:'',
      descrizione: '',
    });
    setImmagine(null);
  };

  const handleDelete= (indexD) => {
    setItems(items.filter((e,index) => index !== indexD))
  }

  const handleEdit= (indexE) => {
    const itemToEdit = items[indexE];

    handleShowOffCanvas();

    setFormData({
      titolo: itemToEdit.titolo,
      luogo: itemToEdit.luogo,
      data: itemToEdit.data,
      descrizione: itemToEdit.descrizione,
    });
    setImmagine(itemToEdit.immagine);
    setIsEditing(true);
    setCurrentEditIndex(indexE);
  }

  const handleCheckboxChange = (index) => {
    const updatedItems = [...items];
    updatedItems[index].isChecked = !updatedItems[index].isChecked;
    setItems(updatedItems);
  };

  const onDateChange = (date)=>{
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
    
    const updatedItems = items.filter(item => item.data === formattedDate);
    setFilteredItems(updatedItems);
  }

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
              <h3 className='p-0 m-0'>{isEditing ? 'Modifica' : 'Aggiungi meta'}Aggiungi meta</h3>

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
                  <input className='w-100' type="file" name='immagine' value={formData.immagine} onChange={handleFileChange}/>

                 
                  <h5>Descrizione</h5>
                  <textarea rows={4} className="w-100 d-block" name="descrizione" value={formData.descrizione} onChange={handleChange}></textarea>

                  <button type='submit' className='btn-default btn-form'>{isEditing ? 'Conferma' : 'Aggiungi'}</button>
                </form>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      
        <div className="cal-map-container m-0 mb-5  row g-4">
          <div className="col-4 m-0 ps-0"><div className="Calendar h-100">
            <Calendar onChange={onDateChange} value={selectedDate}/>
            </div></div>
          <div className="col-8  m-0 pe-0"><div className="Map h-100">Mappa</div></div>
        </div>
        <div>
        
          {filteredItems.length > 0 ? (
             <Accordion className='pb-4'>
             {filteredItems.map((item,index) =>(
               <Accordion.Item eventKey={index} className='accordion-item'>
                 <Accordion.Header className='custon-accordion-header'>  
                   <label className="accordion-checkbox-container">
                     <input 
                     className='accordion-checkbox' 
                     type="checkbox"
                     checked={item.isChecked}
                     onChange={()=>handleCheckboxChange(index)} 
                     />
                     <span className="custom-checkbox"></span>
                   </label>
                   <h5 className='mb-0'>{item.titolo}</h5>
                 </Accordion.Header>
                 <Accordion.Body  className='d-flex'>
                   
                   <div className="img-travel-container me-3">
                     <img src={item.immagine}/>
                   </div>
                   
                   
                   <div className='d-flex descr-btn-containter '>
                     <div className='Description flex-grow-1 me-2 '>
                       <p className=" mb-auto">{item.descrizione}</p>
                     </div>
                     <div className='d-flex  flex-column'>
                       <button onClick={()=> handleEdit(index)} className="mb-auto acc-default-btn edit-btn"><MdEdit /></button>
                       <button onClick={()=> handleDelete(index)} className="acc-default-btn delete-btn"><MdDelete /></button>
                     </div>
                   </div>
                   
                 </Accordion.Body>
               </Accordion.Item>
               ))}
             </Accordion>    
          ):(
            <h5 className='no-meta-message'>Nessuna meta pianificata per oggi</h5>
           
          )}
          
        

        
          

        </div>
      </main>
    </>
  )
}

export default App
