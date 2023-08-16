import Perks from "../perks.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PlacesPage() {
  const {action} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [photoLink,setPhotoLink] = useState('');
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState('');
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState('');
  
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
  async function addPhotoByLink() {
    ev.preventDefault();
    const {data:filename} = await axios.post('/upload-by-link', {link:photoLink})
    setAddedPhotos(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');

  }

return (
  <div>
    {action !== 'new' && (
      <div className="text-center">
      <Link className="inline-flex gap-1bg-primary text-white py-2 px-6 rounded-full" to ={'/account/places/new'}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
        Add new place
        </Link>
    </div>
    )}
    {action === 'new' && (
      <div>
        <form>
          {preInput('Title','Title for your location, should be unique.')}
          <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, example: paris paradise!" />
          
          {preInput('Address','Address to Location')}
          <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

          {preInput('Pictures','please add photos of your location')}
          <div className="flex gap-2">
            <input type="text" 
            value={photoLink} 
            onChange={ev => setPhotoLink(ev.target.value)} 
            placeholder="{add using link ...jpg}" />

            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo </button>
          </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.Length > 0 && addedPhotos.map (Link => (
                <div>
                  <img className="rounded-2xl" src={'http://localhost:4000/uploads/' + Link} alt="" />
                </div>
              ))}
            <button className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
</svg>
              Upload
              </button>
              </div>
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
    )}
    my places
  </div>
)
}