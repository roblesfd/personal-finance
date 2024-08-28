import { Link } from "react-router-dom";
import Box from "../components/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faArrowTrendUp,
  faFilterCircleDollar,
  faFolderOpen,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../components/Table";
import ModalContext from "../context/modalContext";
import FormAddIncome from "./ModalTemplates/FormAddIncome";
import FormAddExpense from "./ModalTemplates/FormAddExpense";
import { useContext } from "react";
import LineChartCustom from "../components/graphs/LineChartCustom";
import PieChartCustom from "../components/graphs/PieChartCustom";
import {
  colData,
  rowData,
  categoriesData,
  methodsData,
  lineChartData,
  pieChartExpenseData,
  pieChartIncomeData,
  pieChartIncomeAccountData,
  pieChartExpenseAccountData,
} from "../utils/mockData";

/**
 *
 * cards con resumen de info (gastos,ingresos, balance total, presupuestos)
 * dropdowns con tablas de gastos e ingresos
 * graficas para mostrar los gastos e ingresos con el tiempo
 * grafico de pastel para visualizar procentaje de gasto/ingreso por categorias
 * grafico que muestre metodos de pago
 */

const Home = () => {
  const { setModal } = useContext(ModalContext);

  return (
    <main>
      {/* cards resumen info */}
      <section
        id="summary"
        className="flex justify-start gap-4 md:justify-between flex-wrap lg:flex-nowrap mb-12 md:mb-0"
      >
        <Box styles={{ size: "medium", rounded: "xl" }}>
          <Link to="#">
            <div className="h-auto w-full md:w-48 p-2 md:p-0">
              <div className="flex flex-col">
                <div>
                  <span className="text-3xl">5,602.00 MXN</span>
                </div>
                <div className="flex justify-between items-center space-y-4">
                  <h3>Balance total</h3>
                  <FontAwesomeIcon
                    icon={faSackDollar}
                    className="text-4xl text-yellow-500"
                  />
                </div>
              </div>
            </div>
          </Link>
        </Box>
        <Box styles={{ size: "medium", rounded: "xl" }}>
          <Link to="#">
            <div className="h-auto w-full md:w-48 p-2 md:p-0">
              <div className="flex flex-col">
                <div>
                  <span className="text-3xl">6,578.00 MXN</span>
                </div>
                <div className="flex justify-between items-center space-y-4">
                  <h3>Ingresos</h3>
                  <FontAwesomeIcon
                    icon={faArrowTrendUp}
                    className="text-4xl text-green-400"
                  />
                </div>
              </div>
            </div>
          </Link>
        </Box>
        <Box styles={{ size: "medium", rounded: "xl" }}>
          <Link to="#">
            <div className="h-auto w-full md:w-48 p-2 md:p-0">
              <div className="flex flex-col">
                <div>
                  <span className="text-3xl">1,252.00 MXN</span>
                </div>
                <div className="flex justify-between items-center space-y-4">
                  <h3>Gastos</h3>
                  <FontAwesomeIcon
                    icon={faArrowTrendDown}
                    className="text-4xl text-red-500"
                  />
                </div>
              </div>
            </div>
          </Link>
        </Box>
        <Box styles={{ size: "medium", rounded: "xl" }}>
          <Link to="#">
            <div className="h-auto w-full md:w-48 p-2 md:p-0">
              <div className="flex flex-col">
                <div>
                  <span className="text-3xl">3</span>
                </div>
                <div className="flex justify-between items-center space-y-4">
                  <h3>Presupuestos activos</h3>
                  <FontAwesomeIcon
                    icon={faFilterCircleDollar}
                    className="text-4xl text-blue-500"
                  />
                </div>
              </div>
            </div>
          </Link>
        </Box>
      </section>
      {/* graficos, informes y estadisticas */}
      <section id="informes" className="grid grid-cols-12 gap-4 mt-6">
        <div className="col-span-12 md:col-span-8">
          <Box styles={{ size: "medium", rounded: "xl" }}>
            <div className="h-[270px] md:h-[300px]">
              <h3 className="font-semibold text-[17px] mb-3 mt-2 md:mt-0">
                Historial de Gastos e Ingresos
              </h3>
              <div className="md:h-[270px]">
                <LineChartCustom data={lineChartData} />
              </div>
            </div>
          </Box>
        </div>
        <div className="col-span-12 md:col-span-4 block">
          <Box styles={{ size: "medium", rounded: "xl" }}>
            <div className="h-[270px]  md:h-[300px] pb-3">
              <h3 className="font-semibold text-[17px] mb-3  mt-2 md:mt-0">
                Gastos por Categoría
              </h3>
              <div className="md:h-[270px]">
                <PieChartCustom data={pieChartExpenseData} />
              </div>
            </div>
          </Box>
        </div>
        <div className="col-span-12 md:col-span-4 block">
          <Box styles={{ size: "medium", rounded: "xl" }}>
            <div className="h-[250px] ">
              <h3 className="font-semibold text-[17px] mb-3  mt-2 md:mt-0">
                Ingresos por categoría
              </h3>
              <div className="md:h-[220px]">
                <PieChartCustom data={pieChartIncomeData} />
              </div>
            </div>
          </Box>
        </div>
        <div className="col-span-12 md:col-span-4 block">
          <Box styles={{ size: "medium", rounded: "xl" }}>
            <div className="h-[250px] ">
              <h3 className="font-semibold text-[17px] mb-3  mt-2 md:mt-0">
                Gastos por cuenta
              </h3>

              <div className="md:h-[220px]">
                <PieChartCustom data={pieChartExpenseAccountData} />
              </div>
            </div>
          </Box>
        </div>
        <div className="col-span-12 md:col-span-4 block">
          <Box styles={{ size: "medium", rounded: "xl" }}>
            <div className="h-[250px] ">
              <h3 className="font-semibold text-[17px] mb-3  mt-2 md:mt-0">
                Ingresos por cuenta
              </h3>

              <div className="md:h-[220px]">
                <PieChartCustom data={pieChartIncomeAccountData} />
              </div>
            </div>
          </Box>
        </div>
      </section>
      {/* ingresos y gastos */}
      <section id="ingresos-gastos" className="grid grid-cols-12 gap-4 mt-6">
        <div className="col-span-6">
          <Box styles={{ size: "medium", rounded: "xl" }}>
            <div className="flex justify-between items-center  ">
              <h3 className="font-semibold text-[17px] mb-3 mt-2 md:mt-0">
                <span className="mr-3">Mis ingresos</span>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  className="text-green-400"
                />
              </h3>
              <button
                className="bg-secondary-200 hover:bg-secondary-500 dark:bg-secondary-600 dark:hover:bg-secondary-700 text-white font-md p-2 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={() =>
                  setModal({ isOpen: true, content: <FormAddIncome /> })
                }
              >
                Añadir +
              </button>
            </div>
            <div className="min-h-[300px]  max-h-[300px] overflow-y-scroll pt-4">
              <Table cols={colData} rows={rowData} actions={() => null} />
            </div>
          </Box>
        </div>
        <div className="col-span-6">
          <Box styles={{ size: "medium", rounded: "xl" }}>
            <div className="flex justify-between items-center  ">
              <h3 className="font-semibold text-[17px] mb-3 mt-2 md:mt-0">
                <span className="mr-3">Mis gastos</span>
                <FontAwesomeIcon
                  icon={faArrowTrendDown}
                  className="text-red-400"
                />
              </h3>
              <button
                className="bg-secondary-200 hover:bg-secondary-500 dark:bg-secondary-600 dark:hover:bg-secondary-700 text-white font-md p-2 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={() =>
                  setModal({ isOpen: true, content: <FormAddExpense /> })
                }
              >
                Añadir +
              </button>
            </div>
            <div className="min-h-[300px]  max-h-[300px] overflow-y-scroll  pt-4">
              <Table cols={colData} rows={rowData} actions={() => null} />
            </div>
          </Box>
        </div>
      </section>
      {/* presupuestos */}
      <section id="presupuestos"></section>
    </main>
  );
};

export default Home;
