import {useContext} from "react";
import {UserContext} from "../UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom"
import axios from "axios";

export default function AccountPage() {
  const [redirect, setToHomepage] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);

  let {subPage} = useParams();
  if (subPage === undefined) {
    subPage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
       setRedirect('/');
       setUser(null);
  }

  if (!ready) {
    return 'Checking the breeze...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  function LinkClasses (type=null) {
    let classes ='py-2 px-6';
    if (type === subPage)  {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes
  }
  if(redirect){
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={LinkClasses('profile')} to={'/account'}> My Profile </Link>
        <Link className={LinkClasses('bookings')} to={'/account/bookings'}> My Bookings </Link>
        <Link className={LinkClasses('places')} to={'/account/places'}> My accommodations </Link>
      </nav>
      {subPage === 'Profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-sm mt-2" >Logout</button>
          </div>
      )}
    </div>
  )
}