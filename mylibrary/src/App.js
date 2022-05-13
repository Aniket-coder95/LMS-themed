import { Routes, Route} from 'react-router-dom';

import './App.css';
import Home from "./components/Home";
import BookList from './components/BookList/BookList';
import LibrarianDashboard from './components/LIBRARIAN/Librarian';
import StudentDashboard from './components/STUDENT/Student';
import AdminDashboard from './components/ADMIN/Admin';
import Signup from './components/Signup/signup';
import Test from './components/test/test'
import AddBook from './components/Librarian/AddBook';
import AdminRegister from './components/Admin/AdminRegister';
import AllStudents from './components/Admin/AllStudents';
import AllLibrarians from './components/Admin/AllLibrarians';
import Demo from './components/demo/test'
import GetuserDetails from './components/GetuserDetails';
  import AdminStudents from './components/ADMIN/AdminStudents';
  import AdminLibrarians from './components/ADMIN/AdminLibrarians';
  import AdminBooks from './components/ADMIN/AdminBooks';
  import AdminRegisterAdmin from './components/ADMIN/AdminRegisterAdmin';
import BooksAvailable from './components/Admin/BooksAvailable';
  import BorrowBooks from './components/STUDENT/BorrowBooks';
import Books from './components/Student/books'
import ForegetPassword from './components/ForgetPassword/ForgetPassword';
import LibrarianAddBooks from './components/LIBRARIAN/LibrarianAddBooks';
import AddNewBooks from './components/LIBRARIAN/AddNewBooks';




function App() 
{
  
  return (
    <>
      <Routes>
      <Route path='/addnewbooks' element={<AddNewBooks/>} /> 
      <Route path='/books' element={<Books/>} /> 
      <Route path='/librarianaddbooks' element={<LibrarianAddBooks/>} /> 
        <Route path='/studentbooks' element={<BorrowBooks/>} /> 
      <Route path='/booksavailable' element={<BooksAvailable/>} />  
        <Route path='/adminbooks' element={<AdminBooks/>} /> 
        <Route path='/adminlibrarians' element={<AdminLibrarians/>} /> 
        <Route path='/adminregisteradmin' element={<AdminRegisterAdmin/>} />      
        <Route path='/adminstudents' element={<AdminStudents/>} />
      <Route path='/userdetailsdemo' element={<GetuserDetails email="student@gmail.com"/>} />
      <Route path='/demo' element={<Demo/>} />
      <Route path='/' element={<Home/>} />
      <Route exact path='/booklist' element={<BookList/>} />
      <Route exact path='/admindashboard' element={<AdminDashboard/>} />
      <Route exact path='/librariandashboard' element={<LibrarianDashboard/>} />
      <Route exact path='/studentdashboard' element={<StudentDashboard/>} />
      <Route exact path='/test' element={<Test/>} />
      <Route exact path='/signup' element={<Signup/>} /> 
      <Route exact path='/forgetpassword' element={<ForegetPassword/>} /> 
      <Route exact path='/addbook' element={<AddBook/>} />
      <Route exact path='/adminregister' element={<AdminRegister/>} />
      <Route exact path='/allstudents' element={<AllStudents/>} />
      <Route exact path='/alllibrarians' element={<AllLibrarians/>} />
      </Routes>
    </>
  );

}

export default App;
