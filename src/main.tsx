
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Toaster } from './components/ui/toaster.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <App />
        <Toaster />
      </PersistGate>

    </Provider>
  </BrowserRouter>
)
