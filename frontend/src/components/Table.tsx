import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ModalContext from "../context/modalContext";
import TransactionDetails from "../views/ModalTemplates/TransactionDetails";
import ConfirmDelete from "../views/ModalTemplates/ConfirmDelete";
// import useAuth from "../hooks/useAuth";

type TableProps = {
  cols: string[];
  rows: object[];
  actions: () => void;
};

const Table = (props: TableProps) => {
  // const { isAdmin } = useAuth();
  const { cols, rows, actions } = props;
  const { modal, setModal } = useContext(ModalContext);

  const addDataCells = (row: object) => {
    const cellList: React.ReactNode[] = [];
    const rowValues = [...Object.values(row)];
    for (let i = 0; i < rowValues.length; i++) {
      const cell = (
        <td key={i} className="whitespace-nowrap px-6 py-4">
          {rowValues[i]}
        </td>
      );
      cellList.push(cell);
    }
    return cellList;
  };

  return (
    <div className="w-full">
      <div className="inline-block py-2 sm:px-6 lg:px-8 overflow-y-scroll">
        <table className="text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500 bg-neutral-100 dark:bg-secondary-600">
            <tr>
              {cols.map((col, key) => (
                <th scope="col" className="px-6 py-4" key={key}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, key) => (
              <tr
                key={key}
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-secondary-600"
              >
                {addDataCells(row)}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <>
                      <button title="Ver detalles">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-secondary-300 dark:text-secondary-50"
                          onClick={() =>
                            setModal({
                              isOpen: true,
                              content: <TransactionDetails />,
                            })
                          }
                        />
                      </button>
                      <button onClick={() => actions()} title="Eliminar">
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500 dark:text-red-400"
                          onClick={() =>
                            setModal({
                              isOpen: true,
                              content: <ConfirmDelete />,
                            })
                          }
                        />
                      </button>
                    </>
                    {/* )} */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
