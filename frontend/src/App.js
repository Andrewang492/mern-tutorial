import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import { DashLayout } from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';

function App() {
  return (
    <Routes>
      {/* Route tag is not closed. Element is layout, other routes go inside. */}
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public/>}/>
        <Route path="login" element={<Login/>}/>

        <Route element={<PersistLogin/>}>
          <Route element={<Prefetch/>}>
            {/* prefetch data for all of notes and users, so no random reloading. */}
            <Route path="dash" element={<DashLayout/>}>
              {/* protected routes */}
              <Route index element={<Welcome/>}/>

              <Route path="users">
                <Route index element={<UsersList/>}/>
                <Route path=":id" element={<EditUser />}/>
                <Route path="new" element={<NewUserForm />} />
              </Route>

              <Route path="notes">
                <Route index element={<NotesList/>}/>
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>


              {/* end of dash board */}
            </Route>
            {/* end prefetch wrapper */}
          </Route> 
          {/* end of persist wrapper */}
        </Route> 
      </Route>
    </Routes>
  );
}

export default App;
