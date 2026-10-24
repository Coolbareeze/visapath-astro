import { useState, useMemo } from 'react';

const FEES = {
  UK: {
    'Visitor (6 months)': 115,
    'Visitor (2 years)': 432,
    'Visitor (5 years)': 785,
    'Visitor (10 years)': 985,
    'Student (Short-term)': 200,
    'Student (Long-term)': 524,
    'Skilled Worker (up to 3 years)': 827,
    'Spouse / Family': 1938,
  },
  USA: {
    'B1/B2 (Tourist/Business)': 185,
    'F1 (Student)': 185,
    'H1B (Work)': 205,
    'J1 (Exchange)': 185,
  },
  Canada: {
    'Visitor Visa (TRV)': 100,
    'Study Permit': 150,
    'Work Permit': 155,
    'Super Visa': 100,
  },
  Schengen: {
    'Short-stay (Adult)': 90,
    'Short-stay (Child 6-12)': 45,
    'Short-stay (Child under 6)': 0,
  },
  UAE: {
    '30-day Tourist': 90,
    '60-day Tourist': 180,
    '5-year Multiple Entry': 190,
  },
  Turkey: {
    'e-Visa (Single Entry)': 60,
    'Sticker Visa': 80,
  },
  Thailand: {
    'Tourist (TR)': 40,
    'Destination Thailand Visa (DTV)': 285,
    'Education (ED)': 80,
  },
  Malaysia: {
    'eVISA (Single Entry)': 50,
    'eNTRI': 20,
  },
  'Saudi Arabia': {
    'Tourist e-Visa': 120,
    'Umrah Visa': 300,
  },
  Australia: {
    'Visitor (600)': 155,
    'Student (500)': 1095,
    'Work (482)': 2525,
  },
};

const CURRENCIES = { USD: 1, PKR: 278, GBP: 0.79, EUR: 0.92 };

export default function VisaFeeCalculator() {
  const [country, setCountry] = useState('UK');
  const [visaType, setVisaType] = useState('Visitor (6 months)');
  const [currency, setCurrency] = useState('PKR');

  const countries = Object.keys(FEES);
  const visaTypes = Object.keys(FEES[country]);

  const feeUSD = FEES[country][visaType] ?? 0;
  const converted = useMemo(() => {
    return Math.round(feeUSD * CURRENCIES[currency]);
  }, [feeUSD, currency]);

  const onCountryChange = (c) => {
    setCountry(c);
    setVisaType(Object.keys(FEES[c])[0]);
  };

  const fmt = (n) => n.toLocaleString();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <select value={country} onChange={(e) => onCountryChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type</label>
          <select value={visaType} onChange={(e) => setVisaType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {visaTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Show in</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(CURRENCIES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-500 rounded-lg p-6 text-center">
        <div className="text-sm text-gray-600 mb-1">Approximate Government Fee</div>
        <div className="text-4xl font-bold text-brand-600">
          {currency === 'PKR' ? '₨' : currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'}{fmt(converted)}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          ≈ ${fmt(feeUSD)} USD · Service centre & biometric charges extra
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Fees change frequently. Always verify on the official embassy website before applying.
      </p>
    </div>
  );
}
