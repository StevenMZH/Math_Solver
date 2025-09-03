import { useState, useEffect } from 'react';
import axiosAuthTokens from '../../services/axiosAuthTokens';
import { useAccountContext } from '../../context/AccountContext';

const useUpdatePreferences = ({language, theme, notifications}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [setLanguage, setTheme, setNotifications] = useAccountContext();

  useEffect(() => {  
    const updatePreferences = async () => {
      try {
        const response = await axiosAuthTokens.post('account/update_preferences/', {
            language: language,
            theme: theme,
            notifications: notifications,
        });
        setActivity(response.data)
        
        setLanguage(language),
        setTheme(theme),
        setNotifications(notification)
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

export default useUpdatePreferences;
