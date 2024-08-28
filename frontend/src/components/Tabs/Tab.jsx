const Tab = ({ title, setActiveTab, activeTab, data }) => {
  return (
    <button
      className={`p-2 text-left text-white hover:bg-primary-400 dark:hover:bg-primary-800 ${
        activeTab === data
          ? "border-b-2 border-primary-500 bg-primary-400 dark:bg-primary-800"
          : ""
      }`}
      onClick={() => setActiveTab(data)}
    >
      {title}
    </button>
  );
};

export default Tab;
