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
      <p>Your content is delivering. Stay calm our dear customer.</p>
      <p>Thank you for your patience.</p>
    </div>
  );
}

export default Loader;
