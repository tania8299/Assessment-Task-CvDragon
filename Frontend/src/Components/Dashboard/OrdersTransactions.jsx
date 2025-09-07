import data from "../../data/ordersTransactions.json";
import revenueIcon from "../../assets/Images/revenueIcon.svg";
import { HiArrowNarrowRight } from "react-icons/hi";
import User from "../../assets/Images/usertransactions.svg";
import { useState } from "react";

export default function OrdersTransactions() {
  const { revenue, transactions } = data;
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <section className="py-2">
      <div className="bg-white shadow rounded-2xl p-4 sm:p-6">
        <h3 className="font-semibold text-black mb-6 text-base sm:text-lg md:text-xl">
          Orders & Transactions
        </h3>
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Revenue", value: `$${revenue.total.toLocaleString()}` },
              { label: "Room Revenue", value: revenue.room.toLocaleString() },
              { label: "Other Revenue", value: revenue.other.toLocaleString() },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3">
                <img
                  src={revenueIcon}
                  alt="icon"
                  className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 p-1.5 md:p-2 rounded-lg"
                />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
                  <h4 className="text-lg sm:text-md md:text-lg lg:text-xl font-semibold text-blue-600">
                    {item.value}
                  </h4>
                </div>
              </div>
            ))}
            <div className="flex justify-start sm:justify-end">
              <button className="text-[10px] sm:text-xs md:text-xs border rounded-lg px-2  py-1 text-gray-500 bg-gray-50">
                Last 7 Days ▾
              </button>
            </div>
          </div>
          <div className="flex bg-gray-50 rounded-md justify-between items-center p-2">
            <button className="text-[10px] sm:text-xs md:text-sm text-gray-400 flex items-center gap-2 cursor-not-allowed">
              View Report
            </button>
            <HiArrowNarrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-5 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700 bg-orange-50 rounded-lg px-4 py-2 sm:py-3 mb-3 min-w-[600px]">
            <span>Name</span>
            <span>Purchase Date</span>
            <span>Purchase ID</span>
            <span>Room Category</span>
            <span className="text-right">Paid Amount</span>
          </div>
          <div className="space-y-2 min-w-[600px]">
            {transactions.map((t, i) => (
              <div
                key={i}
                onClick={() => setSelectedRow(i)}
                className={`grid grid-cols-5 gap-1 items-center px-4 py-2 sm:py-3 rounded-lg border transition cursor-pointer ${
                  selectedRow === i ? "border-yellow-400 shadow-md" : "border-gray-200 hover:shadow"
                }`}
              >
            
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={User}
                    alt="avatar"
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 rounded-full"
                  />
                  <div>
                    <p className="text-[10px] sm:text-xs md:text-xs md:font-regular font-medium text-black">
                      {t.name}
                    </p>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm">{t.date}</span>
                <span className="text-[10px] sm:text-xs md:text-sm">{t.id}</span>
                <span className="text-[10px] sm:text-xs md:text-sm">{t.category}</span>
                <span className="text-right">
                  <button className="px-2 sm:px-3 py-1 text-blue-600 font-medium text-[10px] sm:text-xs md:text-sm border border-blue-200 rounded-full hover:bg-blue-50">
                    ${t.amount}
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
