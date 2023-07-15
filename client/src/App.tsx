import ContentContainer from "./Components/ContentContainer";
import Layout from "./Components/Layout/Layout";
import "./App.css";
import AppRouter from "./Components/AppRouter";
import Footer from "./Components/Footer/Footer";
import FixedWhatsapp from "./Components/FixedWhatsapp/FixedWhatsapp";
import MobileFooterNav from "./Components/MobileFooterNav/MobileFooterNav";

const App: React.FC = () => {
  return (
    <>
      <ContentContainer>
        <Layout />
        <AppRouter />
        <FixedWhatsapp />
        <MobileFooterNav />
        <Footer />
      </ContentContainer>
    </>
  );
};

export default App;
