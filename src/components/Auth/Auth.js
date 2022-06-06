import React,{useEffect, useState} from 'react';
import { Avatar,Button,Paper,Grid,Typography,Container } from '@material-ui/core';
import useStyles from './styles';
import {GoogleLogin} from 'react-google-login';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon'; 
import { useDispatch } from 'react-redux';
import {gapi} from 'gapi-script';
import { useHistory } from 'react-router-dom';
import {signUp,signIn} from '../../actions/auth';
const Auth = () => {
    //const state = null;
    const classes=useStyles();
    //const isSignup=true;//false;
    const [showPassword,setShowPassword]=useState(false);
    const [isSignup,setIsSignUp]=useState(false);
    const dispatch=useDispatch();
    const history=useHistory();
    const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
    const [formData,setFormData]=useState(initialState);
    const submitHandler =(e)=>{
      e.preventDefault();
      if(isSignup){
          dispatch(signUp(formData,history));
      }
      else{
          dispatch(signIn(formData,history));
      }
      //console.log(formData);
    };
    
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleShowPassword=()=> {
      setShowPassword((prevShowPassword)=> !prevShowPassword)
    };
    const switchMode = ()=>{
      setIsSignUp(prevIsSignUp=>!prevIsSignUp);
      setShowPassword(false);
    };
    const googleSuccess=async(resp)=>{
        const result=resp?.profileObj;
        const token = resp?.tokenId;
        try {
            dispatch({type:'AUTH',data :{result,token}});
            //console.log("logged in");
            //console.log(resp);
            history.push('/');

        } catch (error) {
           console.log(error);
        }
    };
    const googleFailure=(error)=>{
      console.log(error);

      console.log('Google Sign In was unsuccesful. Try Again Later');
    };

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:'627305891033-7cmk030rlta8qe0sbn83fdd3vai2kjio.apps.googleusercontent.com',
        scope:'https://www.googleapis.com/auth/drive.metadata.readonly',
      })
    };
    gapi.load('client:auth2',start);
  },[]); 
  //const googleError=()=> {alert('Google Sign In was Unsuccesful. Try Again Later');}
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
              <LockOutLinedIcon />
          </Avatar>
          <Typography variant='h5'>{isSignup? 'Sign Up':'Sign In'}</Typography>
          <form  autocomplete="on"className={classes.form} onSubmit={submitHandler}>
              <Grid container spacing={2}>
                  {isSignup && (
                  <>  
                    <Input name='firstName' label='FirstName' handleChange={handleChange} autoFoucus half/>
                    <Input name='lastName' label='LastName' handleChange={handleChange}  half/>
                  </>
                  )}
                  <Input  autocomplete="on" name='email' label='Email Address' handleChange={handleChange} type='email'/>
                  <Input autocomplete="on" name='password' label='Password' handleChange={handleChange} type={showPassword? "text": "password"} handleShowPassword={handleShowPassword}/>
                  {isSignup&& <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
                </Grid>
                
                <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                  {isSignup?'Sign Up':'sign In'}
                </Button>
                
                <GoogleLogin
                    clientId='627305891033-7cmk030rlta8qe0sbn83fdd3vai2kjio.apps.googleusercontent.com'
                    render={(renderProps)=>(
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>
                          Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy={'single_host_origin'}
                />

                <Grid container justifyContent ='flex-end'> 
                  <Grid item>
                      <Button onClick={switchMode}>{isSignup?'Already have an acoount? Sign In': 'Dont have an account? Sign Up'} </Button>
                  </Grid>
                </Grid>
          </form>
      </Paper>
    </Container>
  )
}

export default Auth;
//client secret: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