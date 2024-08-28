import { Link } from "react-router-dom";

const CardSimple = ({ data }) => {
  return (
    <div className="h-32 min-w-80 max-w-80 p-3 rounded-md shadow-lg border border-primary-30 dark:border-primary-40 text-primary-500  dark:bg-primary-40">
      <h3 className="text-lg font-semibold mb-3 hover:text-primary-300">
        <Link to="#">{data.title}</Link>
      </h3>
      {data.subtitle && (
        <p>
          <Link to="#" className="hover:text-primary-300 font-semibold">
            {data.subtitle}
          </Link>
        </p>
      )}

      <p className="text-sm text-primary-300 dark:text-primary-600 dark:hover:text-primary-900 mt-3">
        <Link to="">{data.linkText}</Link>
      </p>
    </div>
  );
};

export default CardSimple;
