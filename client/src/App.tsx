import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LandingPage } from "./pages/LandingPage";
import { HomePage } from "./pages/HomePage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { ProfilePage } from "./pages/ProfilePage";
import { UploadReqPage } from "./pages/WasteRequestPages/UploadReqPage";
import { WasteReqPage } from "./pages/WasteRequestPages/WasteReqPage";
import { WasteReqOverviewPage } from "./pages/WasteRequestPages/WasteReqOverviewPage";
import { ContributionPage } from "./pages/WasteRequestPages/ContributionPage";
import { UploadInnovativeProdPage } from "./pages/InnovativeProductsPage/UploadInnovativeProdPage";
import { InnovativeProdOverview } from "./pages/InnovativeProductsPage/InnovativeProdOverview";
import { InnovativeProds } from "./pages/InnovativeProductsPage/InnovativeProds";
import { SatisfiedWasteCheckOutPage } from "./pages/WasteRequestPages/SatisfiedWasteCheckOutPage";
import { InnovativeProdCheckOutPage } from "./pages/InnovativeProductsPage/InnovativeProdCheckOutPage";
import { UploadBulkWastePage } from "./pages/BulkWastePages/UploadBulkWastePage";
import { BulkWastePage } from "./pages/BulkWastePages/BulkWastePage";
import { BulkWasteOverviewPage } from "./pages/BulkWastePages/BulkWasteOverviewPage";
import { BulkWasteCheckOutPage } from "./pages/BulkWastePages/BulkWasteCheckOutPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/home" element={<HomePage />} /> 

          {/* Auth Pages */}
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/signin" element={<Signin />} /> 
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Waste Request Pages */}
          <Route path="/upload-req" element={<UploadReqPage />} /> 
          <Route path="/waste-req" element={<WasteReqPage />} /> 
          <Route path="/waste-req-overview/:id" element={<WasteReqOverviewPage />} />
          <Route path="/contribution/:id" element={<ContributionPage />} />
          <Route path="/satisfied-waste/checkout/:id" element={<SatisfiedWasteCheckOutPage />} />

          {/* Innovative Product Pages */}
          <Route path="/upload-innovative-prod" element={<UploadInnovativeProdPage />} />
          <Route path="/innovative-prods" element={<InnovativeProds />} />
          <Route path="/innovative-prod-overview/:id" element={<InnovativeProdOverview />}/>
          <Route path="/innovative-prod/checkout/:id" element={<InnovativeProdCheckOutPage />} />

          {/* Bulk Waste Pages */}
          <Route path="/upload-bulk-waste" element={<UploadBulkWastePage />}/>
          <Route path="/bulk-waste" element={<BulkWastePage />} />
          <Route path="/bulk-waste-overview/:id" element={<BulkWasteOverviewPage />}/>
          <Route path="/bulk-waste/checkout/:id" element={<BulkWasteCheckOutPage />} />
          

        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
};

export default App;
