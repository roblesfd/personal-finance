import { useState } from "react";
import TabsContainer from "@/components/Tabs/TabsContainer";
import Tab from "@/components/Tabs/Tab";
// import { useGetAUserQuery } from "../usersApiSlice";
import { useParams } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";
import ProfileExpenses from "./ProfileExpenses";
import ProfileInfo from "./ProfileInfo";
import ProfileIncomes from "./ProfileIncomes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [activeTab, setActiveTab] = useState("info");
  // const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // const {
  //   data: userInfo,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetAUserQuery(id);
  // const { username } = useAuth();

  let content = (
    <div className="dark:text-secondary-50">
      <header>
        <h1 className="text-2xl font-bold mb-2">Mi Perfil</h1>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-10 pt-6 min-h-screen">
        <div className="col-span-1 md:col-span-2 bg-primary-500 dark:bg-primary-700 rounded-sm pt-10 ">
          <TabsContainer>
            <Tab
              title="Información de la cuenta"
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              data="info"
            />
            <Tab
              title="Mis gastos"
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              data="my-expenses"
            />
            <Tab
              title="Mis ingresos"
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              data="my-incomes"
            />
          </TabsContainer>
        </div>
        <div className="col-span-1 md:col-span-8 py-6 px-6 md:px-10 rounded-sm bg-white dark:bg-secondary-700">
          {activeTab === "info" && <ProfileInfo />}
          {activeTab === "my-expenses" && <ProfileExpenses />}
          {activeTab === "my-incomes" && <ProfileIncomes />}
        </div>
      </section>
    </div>
  );

  // if (isLoading) {
  //   content = <p className="my-8">Cargando...</p>;
  // }

  // if (isSuccess) {
  // content = (
  //   <>
  //     {username === userInfo.username ? (
  //       <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
  //     ) : (
  //       <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
  //     )}
  //     <TabsContainer>
  //       <Tab
  //         title="Información personal"
  //         setActiveTab={setActiveTab}
  //         activeTab={activeTab}
  //         data="info"
  //       />
  //       <Tab
  //         title="Historial de Tickets Resueltos"
  //         setActiveTab={setActiveTab}
  //         activeTab={activeTab}
  //         data="tickets"
  //       />
  //       {username === userInfo.username && (
  //         <Tab
  //           title="Configuración de Cuenta"
  //           setActiveTab={setActiveTab}
  //           activeTab={activeTab}
  //           data="settings"
  //         />
  //       )}
  //     </TabsContainer>
  //     <div className="mt-4">
  //       {activeTab === "info" && <UserProfileInfo userInfo={userInfo} />}
  //       {activeTab === "tickets" && (
  //         <UserProfileTickets tickets={resolvedTickets} />
  //       )}
  //       {activeTab === "settings" && (
  //         <UserProfileSettings userInfo={userInfo} />
  //       )}
  //     </div>
  //   </>
  // );
  // }

  // if (isError) {
  //   content = <p className="my-8 text-red-500">{error?.data?.message}</p>;
  // }

  return <main className="max-w-[850px]  h-full ">{content}</main>;
};

export default Profile;
