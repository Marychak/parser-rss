import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {fetchAuthUser, selectIsAuth, selectIsUserLoading} from './redux/slices/auth';
import {ProtectedRoute} from "./components/ProtectedRoute";
import {Registration, Login, Posts} from './pages';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const isUserLoading = useSelector(selectIsUserLoading);

    React.useEffect(() => {
        dispatch(fetchAuthUser());
    }, [dispatch]);

    if (isUserLoading) return null;

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute user={isAuth}><Posts/></ProtectedRoute>}/>
            <Route element={<ProtectedRoute user={!isAuth} redirectPath='/'/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>
            </Route>
            <Route path="*" element={<Navigate to='/'/>}/>

        </Routes>

    );
}

export default App;