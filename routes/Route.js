const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware');
const HomeController=require('../Controller/HomeController');
const TestController=require('../Controller/TestController');
const LoginController=require('../Controller/LoginController');
const RegisterController=require('../Controller/RegisterController');
const logoutController=require('../Controller/LogoutController');
const searchController=require('../Controller/searchContoller');
const BookingController=require('../Controller/BookingController');
const bookTicketController=require('../Controller/bookTicketController');
const booking_historyController=require('../Controller/bookhistory');
const cancelTicketController=require('../Controller/cancelTicketController');
const FinalticketController=require('../Controller/FinalticketController');
const AdminController=require('../Controller/AdminController');




router.get('/', HomeController.HomeGet);
router.post('/', HomeController.HomePost);

router.get('/test',TestController.TestGet);

router.get('/login',LoginController.LoginGet);
router.post('/login',LoginController.LoginPost);

router.get('/admin', AdminController.AdminGet);

router.get('/register',RegisterController.RegisterGet);
router.post('/register',RegisterController.RegisterPost);

router.get('/logout',logoutController.logoutGet);

router.get('/search',searchController.searchGet);
router.post('/search',searchController.searchPost);

router.get('/book/:train_no', isLoggedIn.isLoggedIn,BookingController.bookingGet);
router.post('/book/:train_no',BookingController.bookingPost);

router.post('/book_ticket/:train_no',bookTicketController.book_ticketPost);

router.get('/booking_history', isLoggedIn.isLoggedIn,booking_historyController.booking_historyGet);

router.get('/cancel_ticket/:book_id', isLoggedIn.isLoggedIn,cancelTicketController.cancel_ticketGet);

router.get('/final_ticket/:book_id' ,  isLoggedIn.isLoggedIn,FinalticketController.final_ticketGet);


module.exports = router;

