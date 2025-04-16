import { useEffect, useState } from 'react';
import axios from 'axios';

const AccountVerification = ({ email }) => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`http://obamai.us-east-1.elasticbeanstalk.com/verify/?token='shayan.ali.mansehra@gmail.com'`, {
          headers: {
            'accept': 'application/json',
          },
        });

        // Check the response status and handle accordingly
        if (response.data.status === 'error') {
          setError(response.data.message); // Set error message from API response
        } else {
          setVerificationStatus(response.data.status); // Assuming there will be a success status
        }
      } catch (err) {
        setError('An error occurred while verifying the account');
      } finally {
        setLoading(false);
      }
    };

    verifyAccount();
  }, [email]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {verificationStatus === 'verified' ? (
        <div>Account verified successfully!</div>
      ) : (
        <div>Account verification failed. Please try again.</div>
      )}
    </div>
  );
};

export default AccountVerification;
