import './App.css';
import Dashboard from './Components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPost from './Components/AddPost';
import Comment from './Components/Comment';
import { AuthContextProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import SinglePost from './Components/SinglePost';
import PopUp from './Components/PopUp';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/createpost" element={<AddPost />} />
            {/* <Route path="/comment" element={<Comment />} /> */}
            <Route path='/post/:postId' element={<SinglePost />} />
            <Route path='/popup' element={<PopUp />}/>
          </Routes>
          <Toaster
            containerStyle={{
              bottom: 125,
            }}
            position="bottom-center"
            reverseOrder={false}
          />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
