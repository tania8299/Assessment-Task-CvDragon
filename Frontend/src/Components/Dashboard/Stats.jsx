import icon from "../../assets/Images/statIcon.svg"; 

export default function Stats() {
  const stats = [
    { title: "Total Bookings" },
    { title: "Total Rooms" },
    { title: "Overall Occupancy Rate" },
    { title: "Total Transaction" },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-2 mb-2">
      {stats.map((item, i) => (
        <div
          key={i}
          className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-500 font-medium text-xs">{item.title}</p>
          
            <h3 className="text-2xl font-semibold text-yellow-500 mt-2">6,589</h3>
          </div>
          <div className="flex items-center justify-center rounded-lg p-2">
            <img src={icon} alt="stats icon" width={28} height={28} />
          </div>
        </div>
      ))}
    </section>
  );
}
