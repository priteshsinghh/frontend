import { useRoutes } from "react-router-dom";
import routesConfig from "./Routes/router";




const App: React.FC = () => {


  const routes = useRoutes(routesConfig);


  return  routes;
};

export default App;


