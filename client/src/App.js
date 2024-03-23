import logo from './logo.svg';
import './App.css';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import StudentProfile from './components/StudentProfile';
import AllAlumni from './components/AllAlumni';
import AllDis from './components/AllDis';
import Events from './components/Events';
import AlumniProfile from './components/AlumniProfile';
import AddEvent from './components/AddEvent';
import AllAlumDis from './components/AllAlumDis';
import AddDis from './components/AddDis';
import MyEvents from './components/MyEvents';
import ErrorElement from './components/ErrorElement';
import EachAlumni from './components/EachAlumni';
import MainEvent from './components/MainEvent';
function App() {
  let router = createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      errorElement:<ErrorElement/>,
      children:[
        {
        path:'',
        element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/new-user',
          element:<Register/>
        },
        {
          path:'/alumni',
          element:<AlumniProfile/>,
        },
            {
              path:'new-discussion',
              element:<AddDis/>
            },
            {
              path:'discussions',
              element:<AllDis/>,
              
            },
            {
              path:'add-event',
              element:<AddEvent/>
            },
            {
              path:'discussion/:disId',
              element:<AllAlumDis/>
            },
            {
              path:'my-events',
              element:<MyEvents/>
            },
        {
          path:'/student',
          element:<StudentProfile/>,
        },
            {
              path:'events',
              element:<Events/>
            },
            {
              path:'/event/:id',
              element:<MainEvent/>
            },
            {
              path:'all-alumni',
              element:<AllAlumni/>
            },
            {
              path:'alumni/:username',
              element:<EachAlumni/>
            },
            
          
      ]
    }
]);
  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
