import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./componentsStyle.css"
import { useNavigate } from "react-router-dom";
import {logoutUser} from "../redux/slices/userSlice"
import Modal from 'react-modal';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    padding: '40px 20px',
  }
};

function Navbar() {
    const userVal = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('user', null);
        dispatch(logoutUser())
        navigate("/login")
        console.log("logout click")
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }

    // function afterOpenModal() {
    //   // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
    // }

    function closeModal() {
      setIsOpen(false);
    }


  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'linear-gradient(to bottom, #f0c760, #dc954a, #e18026)' }}>
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hey {(userVal.email.split('@')[0]).charAt(0).toUpperCase()+((userVal.email.split('@')[0]).slice(1))}! Lets play!!
          </Typography>
          <Button color="inherit" onClick={openModal}>Rules</Button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
 <div className='modal-content'>
            <button onClick={closeModal}>close</button>
              <h2> Rules – </h2>
              <p>- If the card drawn from the deck is a cat card, then the card is removed from the deck.</p>
              <p>- If the card is exploding kitten (bomb) then the player loses the game.</p>
              <p>- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</p>
              <p>- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
            </div>
          </Modal>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>

    // <div className='navbar' >
    //     <h3>{userVal.email}</h3>

    //     <div>
    //       <a onClick={openModal} href="#">Rules</a>
    //       <Modal
    //         isOpen={modalIsOpen}
    //         onRequestClose={closeModal}
    //         style={customStyles}
    //         contentLabel="Example Modal"
    //       >
            
    //         <div className='modal-content' >
    //         <button onClick={closeModal}>close</button>
    //           <h2> Rules – </h2>
    //           <p>- If the card drawn from the deck is a cat card, then the card is removed from the deck.</p>
    //           <p>- If the card is exploding kitten (bomb) then the player loses the game.</p>
    //           <p>- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</p>
    //           <p>- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
    //         </div>
    //       </Modal>
    //       <button className='show-btn' onClick={handleLogout} >Logout</button>
    //     </div>

    // </div>
  )
}

export default Navbar