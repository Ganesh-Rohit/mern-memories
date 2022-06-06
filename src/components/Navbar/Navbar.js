import React,{useState,useEffect} from 'react'
import {AppBar,Avatar,Toolbar,Typography,Button} from '@material-ui/core';
import useStyles from './styles';
import {Link,useHistory,useLocation} from 'react-router-dom';
import memories from '../../images/memories.png';
import memoriesLogo from '../../images/memoriesLogo1.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';


const Navbar = () => {
    const classes=useStyles();
    const User=JSON.parse(localStorage.getItem('Profile'));
    const [user,setUser] = useState(User);
    //console.log(user);
    const dispatch=useDispatch();
    const history=useHistory();
    const location=useLocation();
    const logOut=()=>{
        dispatch({type:'LOGOUT'});
        setUser(null);

        history.push('/');
    };
    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp*72000<new Date().getTime()) logOut();
        }
        setUser(User);
        //console.log("user set",user);
    },[location]);
    return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
    <Link to='/' className={classes.brandContainer} style={{ textDecoration: 'none' }}>
        <Typography  className={classes.heading} variant='h2'  align='center'>Memories</Typography>
        
        <img className={classes.image} src={memoriesLogo} alt="memories"  height="40" />    
    </Link>
    
    <Toolbar className={classes.toolbar}>
        {user?(
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.imaageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color ='secondary' onClick={logOut}>Logout </Button>
            </div>
        ):(
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
    </Toolbar>
    </AppBar>
  )
}

export default Navbar

