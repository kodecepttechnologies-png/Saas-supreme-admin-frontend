import { BrowserRouter } from "react-router-dom";

import { AppProviders } from "./app/providers/AppProviders";
import { AppRoutes } from "./app/routes/routeConfig";

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;