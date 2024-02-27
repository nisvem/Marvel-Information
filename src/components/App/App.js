import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../AppHeader/AppHeader";
import Spiner from '../Spiner/Spiner';

const MainPage = lazy(() => import('../Pages/MainPage'));
const ComicsPage = lazy(() => import('../Pages/ComicsPage'));
const Page404 = lazy(() => import('../Pages/404'));
const SingleComicPage = lazy(() => import('../Pages/SingleComicPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={Spiner}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/> 
                            <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;