function AccountPage({
  children,
  title = 'Just a title',
  description = 'Just a description',
  error,
}) {
  return (
    <div className="flex h-full flex-col bg-white px-8 py-6">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm text-grey-400">{description}</p>
      <hr className="border-t-1 my-4 border-grey-100" />
      {error ? <p>{error.message}</p> : children}
    </div>
  );
}

export default AccountPage;
