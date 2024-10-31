import React from 'react'
import ReactDOM from 'react-dom/client'
import {SnackbarProvider} from "notistack";
import './assets/css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./auth/context";
import Router from "./routes/sections";
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
          <SnackbarProvider
              autoHideDuration={3000}
              anchorOrigin={{ vertical: "bottom", horizontal: 'center'}}  >
              <BrowserRouter>
                  <Router/>
              </BrowserRouter>
          </SnackbarProvider>
      </AuthProvider>
  </React.StrictMode>,
)
