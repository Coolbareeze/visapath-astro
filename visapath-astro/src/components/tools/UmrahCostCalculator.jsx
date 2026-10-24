import { useState, useMemo } from 'react';

const SEASON = {
  'Off-peak (Jan-Feb, Sep-Oct)': 1.0,
  'Shoulder (Mar-Apr, Nov)': 1.2,
  'Peak (May-Jul, Dec)': 1.5,
  'Ramadan (last 10 days)': 2.2,
};

const HOTEL_HARAM = {
  '5-star (facing Haram)': 150,
  '5-star (within 300m)': 100,
  '4-star (500m)': 55,
  '3-star (1km+)': 30,
  'Budget (1.5km+)': 20,
};

const HOTEL_NABAWI = {
  '5-star (facing Masjid)': 130,
  '4-star (within 400m)': 55,
  '3-star (within 1km)': 30,
  'Budget': 20,
};

const PACKAGE_TYPE = {
  'Economy (shared transport, group)': 0.9,
  'Standard': 1.0,
  'VIP (private transport, premium meals)': 1.5,
};
export default function UmrahCostCalculator() {
  const [travelers, setTravelers] = useState(2);
  const [makkahNights, setMakkahNights] = useState(7);
  const [madinahNights, setMadinahNights] = useState(4);
  const [hotelMakkah, setHotelMakkah] = useState('4-star (500m)');
  const [hotelMadinah, setHotelMadinah] = useState('4-star (within 400m)');
  const [season, setSeason] = useState('Shoulder (Mar-Apr, Nov)');
  const [pkg, setPkg] = useState('Standard');

  const result = useMemo(() => {
        const flight = 500 * travelers;
    const umrahVisa = 180 * travelers;
    const makkahHotel = HOTEL_HARAM[hotelMakkah] * makkahNights;
    const madinahHotel = HOTEL_NABAWI[hotelMadinah] * madinahNights;
    const transport = (makkahNights + madinahNights) * 12 * travelers;
    const foodAndMisc = (makkahNights + madinahNights) * 20 * travelers;

    const subtotal = flight + umrahVisa + (makkahHotel + madinahHotel) + transport + foodAndMisc;
    const total = subtotal * SEASON[season] * PACKAGE_TYPE[pkg];

    return {
      total: Math.round(total),
      perPerson: Math.round(total / travelers),
      flight,
      visa: umrahVisa,
      accommodation: Math.round((makkahHotel + madinahHotel) * SEASON[season] * PACKAGE_TYPE[pkg]),
      otherCosts: Math.round((transport + foodAndMisc) * SEASON[season] * PACKAGE_TYPE[pkg]),
    };
  }, [travelers, makkahNights, madinahNights, hotelMakkah, hotelMadinah, season, pkg]);

  const fmt = (n) => n.toLocaleString();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
          <input type="number" value={travelers} min="1" onChange={(e) => setTravelers(Number(e.target.value) || 1)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
          <select value={season} onChange={(e) => setSeason(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(SEASON).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nights in Makkah</label>
          <input type="number" value={makkahNights} min="1" onChange={(e) => setMakkahNights(Number(e.target.value) || 1)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nights in Madinah</label>
          <input type="number" value={madinahNights} min="0" onChange={(e) => setMadinahNights(Number(e.target.value) || 0)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Makkah Hotel</label>
          <select value={hotelMakkah} onChange={(e) => setHotelMakkah(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(HOTEL_HARAM).map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Madinah Hotel</label>
          <select value={hotelMadinah} onChange={(e) => setHotelMadinah(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(HOTEL_NABAWI).map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
          <select value={pkg} onChange={(e) => setPkg(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(PACKAGE_TYPE).map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-500 rounded-lg p-6">
        <div className="text-center mb-4">
          <div className="text-sm text-gray-600 mb-1">Estimated Total Cost</div>
          <div className="text-4xl font-bold text-brand-600">${fmt(result.total)}</div>
          <div className="text-sm text-gray-600 mt-1">≈ PKR {fmt(result.total * 278)}</div>
          <div className="text-xs text-gray-500 mt-1">${fmt(result.perPerson)} per person</div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-brand-500/30">
          <div>Flights: <strong>${fmt(result.flight)}</strong></div>
          <div>Umrah Visa: <strong>${fmt(result.visa)}</strong></div>
          <div>Accommodation: <strong>${fmt(result.accommodation)}</strong></div>
          <div>Transport & Food: <strong>${fmt(result.otherCosts)}</strong></div>
        </div>
      </div>
    </div>
  );
}
