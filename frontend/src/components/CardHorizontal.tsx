import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const handleAddFriend = () => {
  console.log("Añadido como amigo");
};

const CardHorizontal = ({ data }) => {
  return (
    <div className="flex flex-row justify-between items-center bg-white rounded p-4 shadow-lg min-w-64 max-w-64 h-36">
      <img
        src={data.profilePicture}
        alt={`${data.name} profile`}
        className="w-20 h-20 rounded-full shadow-lg"
      />

      <div className="flex flex-col">
        <h3 className="text-md font-semibold text-gray-900">{data.name}</h3>
        <button
          onClick={handleAddFriend}
          className="mt-4 self-center  bg-primary-400 hover:bg-primary-300 text-white py-2 px-4 rounded-lg shadow"
        >
          {data.buttonText}
        </button>
      </div>
    </div>
  );
};

export default CardHorizontal;
