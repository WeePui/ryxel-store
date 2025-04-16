'use client';

import React, { useState, useEffect } from 'react';

// Giả sử data được import từ file JSON hoặc fetch từ API
import locationData from '@public/cities_data.json';
import Input from '../UI/Input';
import { Address } from '@/app/_types/address';

interface LocationSelectorProps {
  address?: Address;
}

interface Province {
  code: number;
  name: string;
  Districts?: District[];
}

interface District {
  code: number;
  name: string;
  Wards?: Ward[];
}

interface Ward {
  code: string;
  name: string;
}

function LocationSelector({ address }: LocationSelectorProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

  useEffect(() => {
    setProvinces(locationData);
  }, []);

  useEffect(() => {
    if (address) {
      setSelectedProvince(address.city || null);
      setSelectedDistrict(address.district || null);
      setSelectedWard(address.ward || null);
    }
  }, [address]);

  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find((p) => p.code === selectedProvince.code);
      setDistricts(province?.Districts || []);
      if (address && selectedProvince.code === address.city.code) {
        setSelectedDistrict(address.district || null);
        return;
      }
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
    } else {
      setDistricts([]);
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedProvince, provinces, address]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find((d) => d.code === selectedDistrict.code);
      setWards(district?.Wards || []);
      if (address && selectedDistrict.code === address.district.code) {
        setSelectedWard(address.ward || null);
        return;
      }
      setSelectedWard(null);
    } else {
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedDistrict, districts, address]);

  const handleProvinceChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const selectedCode = parseInt(e.target.value, 10);
    const selected = provinces.find((p) => p.code === selectedCode);
    setSelectedProvince(
      selected ? { code: selected.code, name: selected.name } : null
    );
  };

  const handleDistrictChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const selectedCode = parseInt(e.target.value, 10);
    const selected = districts.find((d) => d.code === selectedCode);
    setSelectedDistrict(
      selected ? { code: selected.code, name: selected.name } : null
    );
  };

  const handleWardChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const selectedCode = e.target.value;
    const selected = wards.find((w) => w.code === selectedCode);
    setSelectedWard(
      selected ? { code: selected.code, name: selected.name } : null
    );
  };

  return (
    <div className="flex w-full items-center gap-2 sm:flex-col sm:gap-4">
      <Input
        type="select"
        label="Province/City"
        optionPlaceholder="Chọn tỉnh/thành phố"
        name="cityCode"
        id="cityCode"
        options={provinces.map((province) => ({
          label: province.name,
          value: province.code, // Dùng code làm value
        }))}
        value={selectedProvince?.code || ''} // Dùng code làm giá trị
        onChange={handleProvinceChange}
      />
      <input
        type="hidden"
        name="cityName"
        value={selectedProvince?.name || ''}
      />
      <Input
        type="select"
        label="Quận/Huyện"
        optionPlaceholder="Chọn quận/huyện"
        name="districtCode"
        id="districtCode"
        options={districts.map((district) => ({
          label: district.name,
          value: district.code,
        }))}
        value={selectedDistrict?.code || ''}
        onChange={handleDistrictChange}
        disabled={!districts.length}
      />
      <input
        type="hidden"
        name="districtName"
        value={selectedDistrict?.name || ''}
      />
      <Input
        type="select"
        label="Phường/Xã"
        optionPlaceholder="Chọn phường/xã"
        name="wardCode"
        id="wardCode"
        options={wards.map((ward) => ({
          label: ward.name,
          value: ward.code,
        }))}
        value={selectedWard?.code || ''}
        onChange={handleWardChange}
        disabled={!wards.length}
      />
      <input type="hidden" name="wardName" value={selectedWard?.name || ''} />
    </div>
  );
}

export default LocationSelector;
