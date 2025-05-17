import Lottie from "lottie-react";
import Succeeded from "../../assets/Lottie/congratulations.json";
import { Link } from "react-router-dom";
import ThemeMode from "../../Utils/ThemeMode";

function Success() {
  return (
    <>
      <div className="block w-fit ml-auto mt-6 mr-4">
        <ThemeMode />
      </div>
      <div className="flex-cen flex-col mt-10">
        <Lottie animationData={Succeeded} loop={true} className="w-40" />
        <h3 className="text-4xl font-bold text-green-600">
          Booking Successful!
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Thanks for booking. See you at the event!
        </p>
        <button className="btn">
          <Link to="/eventlist">Booklist</Link>
        </button>
      </div>
    </>
  );
}

export default Success;
