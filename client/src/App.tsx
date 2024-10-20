import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { BulkWasteOverviewPage } from "./pages/BulkWasteOverviewPage";
import { BulkWastePage } from "./pages/BulkWastePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ContributionPage } from "./pages/ContributionPage";
import { InnovativeProdOverview } from "./pages/InnovativeProdOverview";
import { InnovativeProds } from "./pages/InnovativeProds";
import { OrderTrackingPage } from "./pages/OrderTrackingPage";
import { UploadBulkWastePage } from "./pages/UploadBulkWastePage";
import { UploadInnovativeProdPage } from "./pages/UploadInnovativeProdPage";
import { UploadReqPage } from "./pages/UploadReqPage";
import { WasteReqOverviewPage } from "./pages/WasteReqOverviewPage";
import { WasteReqPage } from "./pages/WasteReqPage";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Signin } from "./pages/Signin";
import { LandingPage } from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} /> {/*done */}
          <Route path="/signup" element={<Signup />} /> {/*done */}
          <Route path="/signin" element={<Signin />} /> {/*done */}
          <Route path="/forgotpassword" element={<ForgotPassword />} /> {/*done */}
          <Route path="/resetpassword" element={<ResetPassword />} /> {/*done */}
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/bulk-waste-overview/:id" element={<BulkWasteOverviewPage />} />
          <Route path="/bulk-waste" element={<BulkWastePage />} /> {/*done */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contribution" element={<ContributionPage />} />
          <Route path="/innovative-prod-overview/:id" element={<InnovativeProdOverview />} />
          <Route path="/innovative-prods" element={<InnovativeProds />} /> {/*done */}
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          <Route path="/upload-bulk-waste" element={<UploadBulkWastePage />} /> {/*done */}
          <Route path="/upload-innovative-prod" element={<UploadInnovativeProdPage />} /> {/*done */}
          <Route path="/upload-req" element={<UploadReqPage />} /> {/*done */} 
          <Route path="/waste-req-overview/:id" element={<WasteReqOverviewPage />} />
          <Route path="/waste-req" element={<WasteReqPage />} /> {/*done */}
          <Route path="/" element={<LandingPage />} /> {/*done */}
        </Routes>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
