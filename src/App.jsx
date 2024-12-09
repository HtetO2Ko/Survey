import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Survey from "./pages/Survey";
import CreateUpdateSurvey from "./pages/CreateUpdateSurvey";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/createupdate/:id" element={<CreateUpdateSurvey />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
