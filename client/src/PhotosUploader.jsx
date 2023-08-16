import axios from "axios"

export default function PhotosUploader(addedPhotos, onChange){
    const [photoLink,setPhotoLink] = useState('');
    async function addPhotoByLink() {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink})
        onChange(prev => {
          return [...prev, filename];
        });
        setPhotoLink('');
      }
    function uploadPhoto(ev){
      const files = ev.target.files
      const data = new FormData()
      for(let i = 0; i < files.lenght; i++) {
        data.append('photos', files[i])
      }
      axios.post('/upload', data, {
        headers: {'Content-type':'multipart/form-data'}
      }).then(response => {
        const{data:filenames} = response;
        onChange(prev => {
          return [...prev, ...filenames];
        });
        console.log(data)
      })
    }
    return(
        <>
         <div className="flex gap-2">
            <input 
                value={photoLink} 
                onChange={ev => setPhotoLink(ev.target.value)} 
                type="text" 
                placeholder="{add using link ...jpg}" />
            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo </button>
        </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.Length > 0 && addedPhotos.map (Link => (
                <div className="h-32 flex" key={link}>
                  <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + Link} alt="" />
                </div>
              ))}
                <label className="h-32 curson-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                    <input type="file" className="hidden" onChange={uploadPhoto}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}