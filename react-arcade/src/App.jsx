import Carousel from "./components/Carousel";

const App = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return <Carousel items={items} active={0} />;
};

export default App;
