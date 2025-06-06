function Loader() {
  const letters = ["R", "Y", "X", "E", "L", ".", ".", "."];

  return (
    <div className="text-md flex flex-col items-center justify-center px-6 text-primary-600 md:justify-start md:py-6">
      <div className="loading-container text-primary-500">
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
      <p className="text-center">
        Nội dung của bạn đang được tải. Ăn một miếng bánh và uống trà.
      </p>
      <p>Xin cảm ơn vì sự kiên nhẫn của bạn.</p>
    </div>
  );
}

export default Loader;
