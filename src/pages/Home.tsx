import Header from "../components/Header";
import LeftNavigation from "../components/LeftNavigation";

const Home = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <Header />
      <div className="flex-1 flex gap-3">
        <LeftNavigation />
        <div className="content flex-1"></div>
      </div>
    </div>
  );
};

export default Home;
