import { Outlet } from 'react-router-dom';
import Categories from '../../category/categories.component';

const Home = () => {
  return (
    <div>
        <Outlet />
        <Categories />
    </div>
    
  );
}

export default Home;
