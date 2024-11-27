function SortSelector() {
  return (
    <div className="flex items-center justify-end gap-4">
      <span className="font-thin">Sort by: </span>
      <select className="rounded-lg border-2 border-grey-300 py-3 pl-3 pr-12 font-bold text-primary-default hover:bg-grey-50 hover:ring-[1px] hover:ring-grey-300 focus:bg-grey-50 focus:ring-[1px] focus:ring-grey-300">
        <option value="createdAt">Release Date</option>
        <option value="titleAZ">Title (A - Z)</option>
        <option value="ratingHighToLow">Rating (high to low)</option>
        <option value="priceHighToLow">Price (high to low)</option>
        <option value="priceLowToHigh">Price (low to high)</option>
      </select>
    </div>
  );
}

export default SortSelector;
