import { useState, useEffect } from 'react';
import axiosAuthTokens from '../../services/axiosAuthTokens';
import { useAccountContext } from '../../context/accountContext';

const useUpdateUser = ({username, email, first_name}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [setUsername, setEmail, setFirst_name, setLast_name] = useAccountContext();

  useEffect(() => {  
    const updatePreferences = async () => {
      try {
        const response = await axiosAuthTokens.post('account/update_user/', {
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
        });        
        setUsername(username),
        setEmail(email),
        setFirst_name(first_name),
        setLast_name(last_name)
      } catch (err) {
        setError(err.response?.data || 'Error saving progress');
      } finally {
        setLoading(false);
      }
    };
  
    updatePreferences();
  }, []);
  
  return { loading, error };
};

export default useUpdateUser;