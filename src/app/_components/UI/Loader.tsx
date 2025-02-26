function Loader() {
  const letters = ['R', 'Y', 'X', 'E', 'L', '.', '.', '.'];

  return (
    <div className="text-md flex flex-col items-center justify-center text-primary-600">
      <div className="loading-container text-primary-300">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="loading-letter"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <p>Nội dung của bạn đang được tải. Ăn một miếng bánh và uống trà.</p>
      <p>Xin cảm ơn vì sự kiên nhẫn của bạn.</p>
    </div>
  );
}

export default Loader;
