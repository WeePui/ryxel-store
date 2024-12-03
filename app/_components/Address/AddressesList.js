import { getAddresses } from '../../_libs/apiServices';
import AddressCard from './AddressCard';
import { cookies } from 'next/headers';

async function AddressesList() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');
  const data = await getAddresses(token);
  if (data.status !== 'success') throw new Error(data.message);
  const addresses = data.data.addresses;

  // Sort addresses to ensure the default address appears first
  const sortedAddresses = addresses?.sort((a, b) => b.isDefault - a.isDefault);

  return (
    <div className="flex flex-col divide-y">
      {sortedAddresses.map((address) => (
        <AddressCard key={address._id} address={address} />
      ))}
    </div>
  );
}

export default AddressesList;
