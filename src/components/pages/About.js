import React from 'react';
import '../../App.css';
import './About.css'
import '../../App.js'
import axios from 'axios';

export default function About() {
  const baseURL = 'http://127.0.0.1:5000/';

  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFWcEdtZXZ0VDVvSE1uVC01d0oyMSJ9.eyJpc3MiOiJodHRwczovL3ByZWRpY3RhbnQudXMuYXV0aDAuY29tLyIsInN1YiI6IlVXanBzZFNYZkRjNThQa2hycDNZMExSV0hUS1lNdEJvQGNsaWVudHMiLCJhdWQiOiJodHRwOi8vMTI3LjAuMC4xOjUwMDAvdXNlciIsImlhdCI6MTYzODM0NjQ4MywiZXhwIjoxNjM4NDMyODgzLCJhenAiOiJVV2pwc2RTWGZEYzU4UGtocnAzWTBMUldIVEtZTXRCbyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.AqckNfJVVWoftLk3ecQNwI8lxWhZ4uF8uA73MbVffhaal321TLZfW6ddzOHWM-csoSzMm8nvz9zt-3Ym1nPOodMpKl_oMMQsu_qauRyHAm74P0zxyOQU6tPpIVq4gRehH4xBqdpOp6dTlsmSN_Ha_SSZEQdLq4WsYBvr-lBVeu6xvT7SQ_pKKwpXrstZmMIfvNBK9SdKvOTCnpl2tNJHz0TRSqHUQ3cpioVqtvWXHySu3Pl7WsPe_j6HSag32fgXV1of19mlcYHWV1XVsr6uChi_sLGSTRRA29ZtkzcVNLTn-LVWbFl6cCQFfjHMpldABdtxFBCXP8YeVLQZh2mtVQ';
  React.useEffect(() => {
      axios({
        method: 'get',
        url: baseURL + 'user/' + '964a2b04ead82b5cb0636c45',
        headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
             console.log(res);
      });
  }, []);

  return (
      <div className='h1'>
        <h1>About</h1>
        <div className='body'>
          <p> <span> Joe Wankleman</span> </p>
          <p> <span> Jibran Ahmed</span> </p>
          <p><span> Adrian Unruh </span> </p>
          <p><span> Elise Wong </span> </p>
          <p><span> William Simcox </span> </p>
          <p><span> Hailie Fain </span> </p>
          <p><span> Dylan Usoro </span> </p>
        </div>

      </div>

  )

}
