import "bootstrap/dist/css/bootstrap.min.css";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./components/login/LoginPage";
import Navbar from "./components/navbar/Navbar";

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/login" element={<LoginPage />} exact />
					<Route path="*" element={<Navbar />} />
					<Route path="" element={<Navigate to="/login" />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
