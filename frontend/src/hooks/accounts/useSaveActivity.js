import { useState, useEffect } from 'react';
import axiosAuthTokens from '../../services/axiosAuthTokens';

const useSaveActivity = ({status, content_id, object_id}) => {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {  
    const saveActivity = async () => {
      try {
        const response = await axiosAuthTokens.post('account/register_activity/', {
            status: status,
            activity: activity,
            object_id: object_id,
        });
        setActivity(response.data)
      } catch (err) {
        setError(err.response?.data || 'Error saving progress');
      } finally {
        setLoading(false);
      }
    };
  
    saveActivity();
  }, []);
  
  return { loading, error };
};

export default useSaveActivity;
