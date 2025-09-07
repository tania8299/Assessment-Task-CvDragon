import Stats from "../Components/Dashboard/Stats";
import ChartsSection from "../Components/Dashboard/ChartsSection";
import OrdersTransactions from "../Components/Dashboard/OrdersTransactions";

export default function Dashboard() {
  return (
    <div className="bg-gray-100">
      <Stats />
      <ChartsSection />
      <OrdersTransactions />
    </div>
  );
}
