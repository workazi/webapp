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
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch'>
          {packages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            const isFree = Number(pkg.price) === 0;

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-green-600 bg-green-50/30 ring-2 ring-green-500/20 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className='space-y-3'>
                  {/* Package Name & Status Badge */}
                  <div className='flex items-start justify-between gap-2'>
                    <h3 className='text-base font-bold text-gray-900 leading-snug'>
                      {pkg.package_name}
                    </h3>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isSelected
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isSelected ? 'Selected' : pkg.duration || 'Plan'}
                    </span>
                  </div>

                  {/* Compact Pricing */}
                  <div className='flex items-baseline gap-1 pt-1'>
                    {isFree ? (
                      <span className='text-2xl font-extrabold tracking-tight text-gray-900'>
                        Free
                      </span>
                    ) : (
                      <>
                        <span className='text-xs font-semibold uppercase text-gray-500'>
                          KES
                        </span>
                        <span className='text-2xl font-extrabold tracking-tight text-gray-900'>
                          {Number(pkg.price).toLocaleString()}
                        </span>
                        {pkg.duration && (
                          <span className='text-xs font-medium text-gray-500'>
                            / {pkg.duration}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <div className='border-t border-gray-100 pt-3'>
                    <p className='text-xs text-gray-600 leading-relaxed'>
                      {pkg.package_description}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type='button'
                  className={`mt-5 w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors duration-150 ${
                    isSelected
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? 'Selected Plan' : 'Choose Plan'}
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