import AccountNav from "../AccountNav.jsx";
import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../perks.jsx";
import {useState} from "react";
import axios from "axios";

export default function PlacesFormPage() {
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState('');
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState('');
    const [redirect, setRedirect] = useState(false);
    function inputHeader(text) {
        return (
         <h2 className="text-2xl mt-4">{text}</h2>
        );
       }
       function inputDescription(text) {
         return(
           <p className="test-gray-500 text-sm">{text}</p>
         )
       };
       function preInput(header,description) {
         return(
           <>
           {inputHeader(header)}
            {inputDescription(description)}
           </>
         );
       }
     
       async function addNewPlace(ev){
         ev.preventDefault()
         await axios.post('/places', {
           title, address, addedPhotos, 
           description, perks, extraInfo, 
           checkIn, checkOut, maxGuests
         })
         setRedirect(true);
       }

       if (redirect) {
        return <Navigate to={'/account/places'} />
       }

    return(
        <div>
            <AccountNav />
        <form onSubmit={addNewPlace}>
          {preInput('Title','Title for your location, should be unique.')}
          <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, example: paris paradise!" />
          {preInput('Address','Address to Location')}
          <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
          {preInput('Photos','more = better')}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput('Description','description of location')}
          <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
              {preInput('Perks','Select any perks that make your spot a breeze')}
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {preInput('extra information','House rules and guidelines')}
          <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
          {preInput('check-in & checkout times, max guests','check in&out times should include time for cleaning between breeze guests.')}
          <div className="grid gap-2 sm:grid-cols-3 ">
            <div>
              <h3 className="mt-2 -mb-1">Check-in time:</h3>
              <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="8:00am"/>
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Checkout time:</h3>
              <input type="text" 
              value ={checkOut} 
              onChange={ev => setCheckOut(ev.target.value)} 
              placeholder="3:00pm"/>
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Max guests:</h3>
              <input type="number" 
              value={maxGuests} 
              onChange={ev => setMaxGuests(ev.target.value)}/> 
            </div>
          </div>
          <div>
            <button className="bg-primary my-4 text-white py-2 px-6 rounded-full">Save</button>
          </div>
        </form>
      </div>
    )
}