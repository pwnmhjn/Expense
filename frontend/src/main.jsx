import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GridBackground from './components/UI/GridBackgroud.jsx'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  //TODO => update the uri on production
  uri: 'http://localhost:4000/graphql',// the URL of our GraphQl Server.
  cache: new InMemoryCache(),// Apollo client uses to caches query results after fetching them.
  credentials: "include" // This tells apollo client to send cookies along with every request to the sercer.
});

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridBackground>
  </BrowserRouter>

)
