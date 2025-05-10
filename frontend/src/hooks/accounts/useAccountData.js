import { useState, useEffect } from 'react';
import axiosAuthTokens from '../../services/axiosAuthTokens';

const useAccountData = () => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {  
    const fetchAccountData = async () => {
      try {
        const response = await axiosAuthTokens.get('account/account/');
        setAccountData(response.data)
      } catch (err) {
        setError(err.response?.data || 'Error fetching account data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAccountData();
  }, []);
  
  return { accountData, loading, error };
};

export default useAccountData;
