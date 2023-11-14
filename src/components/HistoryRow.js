const HistoryRow = ({ name, date, fetchWeather, isLoading, deleteHistory }) => {
  return (
    <div className='history-row-container'>
      <div className='history-data-container'>
        <div className='history-name'>{name}</div>
        <div className='history-date'>{date}</div>
      </div>
      <div className='history-actions-container'>
        <button
          disabled={isLoading}
          onClick={() => fetchWeather(name)}
          type='button'>
          <img src='/search.png' alt='Search' />
        </button>
        <button disabled={isLoading} onClick={deleteHistory} type='button'>
          <img src='/delete.png' alt='Delete' />
        </button>
      </div>
    </div>
  );
};

export default HistoryRow;
