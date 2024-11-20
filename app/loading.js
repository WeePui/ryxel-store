function Loading() {
  const letters = ['R', 'Y', 'X', 'E', 'L', '.', '.', '.'];

  return (
    <div className="flex flex-col items-center text-primary-600 text-md">
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

export default Loading;
