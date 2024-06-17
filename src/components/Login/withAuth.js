import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
        
        React.useEffect(() => {
            if (!isAuthenticated) {
                navigate('/login');
            }
        }, [isAuthenticated, navigate]);
        
        if (!isAuthenticated) {
            return null;
        }
        
        return <Component {...props} />;
    };
};

export default withAuth;
