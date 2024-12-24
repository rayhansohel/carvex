import { Helmet } from "react-helmet-async";

const MyBookings = () => {
  return (
    <div className="text-sm  flex justify-center items-center gap-4 flex-col">
      <Helmet>
        <title>My Bookings- Carvex</title>
      </Helmet>
      <h1 className="text-7xl uppercase font-extrabold font-antonio">MY Bookings</h1>
    </div>
  );
};

export default MyBookings;
