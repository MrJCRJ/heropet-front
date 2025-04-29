import StockHistory from "./StockHistory";

const Home = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Histórico de Estoque
        </h2>
        <StockHistory />
      </div>
    </div>
  );
};

export default Home;
