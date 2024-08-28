import CardHorizontal from "@/components/CardHorizontal";

const ProfileIncomes = () => {
  const user = {
    name: "Nombre de servidor",
    profilePicture: "https://via.placeholder.com/150", // Reemplaza con la URL real de la foto de perfil
    buttonText: "Abandonar",
  };
  return (
    <div className="flex flex-row flex-wrap content-start gap-5 overflow-x-scroll h-full">
      <CardHorizontal data={user} />
      <CardHorizontal data={user} />
      <CardHorizontal data={user} />
      <CardHorizontal data={user} />
      <CardHorizontal data={user} />
      <CardHorizontal data={user} />
    </div>
  );
};

export default ProfileIncomes;
