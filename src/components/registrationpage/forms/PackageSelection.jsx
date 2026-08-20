import { useState, useEffect } from 'react';
import { getPackages } from '../../../api/options';
import { useAuth } from '../../../context/AuthContext';

export default function PackageSelection({ handleNextFunc }) {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const [packagesError, setPackagesError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const isEmployee =  true;

  useEffect(() => {
    const loadPackages = async () => {
      if (!user?.id) {
        setPackagesError('Please log in again to continue.');
        setIsLoading(false);
        return;
      }

      const response = await getPackages(user.id, isEmployee);

      if (response.success) {
        const availablePackages = response.data?.packages || [];
        setPackages(availablePackages);
        setSelectedPackage(availablePackages[0]?.id ?? null);
      } else {
        setPackagesError(response.data?.detail || 'Could not load available packages.');
      }
      setIsLoading(false);
    };

    loadPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <div className='max-w-6xl mx-auto p-4 grid gap-8'>
      {/* Header Section */}
      <div className='grid gap-2 max-w-2xl'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Package selection</h1>
        <p className='text-gray-500 leading-relaxed'>
          Please choose the package you will be subscribing to monthly. For the first month it will be free, 
          and we will always remind you before any renewal. More details about payment will be shared with you.
        </p>
      </div>

      {packagesError && (
        <div className='p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200'>
          {packagesError}
        </div>
      )}

      {isLoading && !packagesError && (
        <p className='text-gray-500'>Loading packages...</p>
      )}

      {/* Packages Grid */}
      {!isLoading && packages.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
          {packages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`flex flex-col h-full justify-between border p-6 rounded-xl shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md ${
                  isSelected
                    ? 'border-green-500 ring-2 ring-green-500/20 bg-green-50/10'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className='grid gap-4'>
                  {/* Package Name & Tag */}
                  <div className='flex justify-between items-center'>
                    <h3 className='text-xl font-bold text-gray-800'>{pkg.package_name}</h3>
                    {isSelected && (
                      <span className='bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-semibold'>
                        Selected
                      </span>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className='flex items-baseline text-gray-900'>
                    <span className='text-5xl font-extrabold tracking-tight'>
                      {Number(pkg.price) === 0 ? 'Free' : `${pkg.price} KES`}
                    </span>
                    {Number(pkg.price) !== 0 && (
                      <span className='text-gray-500 ml-1 text-xl font-semibold'>
                        /{pkg.duration}
                      </span>
                    )}
                  </div>

                  <p className='text-sm text-gray-500'>{pkg.package_description}</p>
                </div>

                {/* Action Button */}
                <button
                  type='button'
                  className={`w-full py-2.5 px-4 font-medium rounded-lg transition-colors duration-150 mt-6 ${
                    isSelected
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-250'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!isLoading && !packagesError && (
        <button
          type='button'
          onClick={handleNextFunc}
          disabled={!selectedPackage}
          className='w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Continue
        </button>
      )}
    </div>
  );
}