import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import { store, persistor  } from "@/redux/store";
import { stripePromise } from "@/utils/stripe/stripe.utils";
import { Elements } from "@stripe/react-stripe-js";
import './index.css'

const rootElement = document.getElementById("root");

if (!rootElement) {
	console.error("Root element not found");
} else {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>
					<Elements stripe={stripePromise}>
						<App />
					</Elements>
				</BrowserRouter>
			</PersistGate>
			</Provider>
		</StrictMode>
	);
}
