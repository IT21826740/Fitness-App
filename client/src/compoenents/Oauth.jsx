import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const Oauth = () => {

  const navigate = useNavigate();
  return (
    
    <GoogleLogin
      
  onSuccess={credentialResponse => {
        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
        console.log(credentialResponseDecoded);
        navigate("/profile")
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
  );
};

export default Oauth;
