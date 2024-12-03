'use client';

import { useState, useEffect } from 'react';

// Giả sử data được import từ file JSON hoặc fetch từ API
import locationData from '@public/mongo_data_vn_unit.json';
import Input from '../UI/Input';

function LocationSelector({ address }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    setProvinces(locationData);
  }, []);

  useEffect(() => {
    if (address) {
      setSelectedProvince(address.city || '');
      setSelectedDistrict(address.district || '');
      setSelectedWard(address.ward || '');
    }
  }, [address]);

  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find((p) => p.Name === selectedProvince);
      setDistricts(province?.District || []);
      if (!address || address.city !== selectedProvince) {
        setSelectedDistrict('');
        setWards([]);
        setSelectedWard('');
      }
    }
  }, [selectedProvince, provinces, address]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find((d) => d.FullName === selectedDistrict);
      setWards(district?.Ward || []);
      if (!address || address.district !== selectedDistrict) {
        setSelectedWard('');
      }
    }
  }, [selectedDistrict, districts, address]);

  return (
    <div className="flex w-full items-center gap-2">
      <Input
        type="select"
        label="Province/City"
        optionPlaceholder="Select province/city"
        name="city"
        id="city"
        options={provinces.map((province) => ({
          label: province.Name,
          value: province.Name,
        }))}
        value={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
      />
      <Input
        type="select"
        label="District"
        optionPlaceholder="Select district"
        name="district"
        id="district"
        options={districts.map((district) => ({
          label: district.FullName,
          value: district.FullName,
        }))}
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        disabled={!districts.length}
      />
      <Input
        type="select"
        label="Ward"
        optionPlaceholder="Select ward"
        name="ward"
        id="ward"
        options={wards.map((ward) => ({
          label: ward.FullName,
          value: ward.FullName,
        }))}
        value={selectedWard}
        onChange={(e) => setSelectedWard(e.target.value)}
        disabled={!wards.length}
      />
    </div>
  );
}

export default LocationSelector;
