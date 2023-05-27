import CategorySection from './CategorySection';
import PopularSection from './PopularSection';
import SaleSection from './SaleSection';

function Recommendation() {
  return (
    <main className="main">
      <CategorySection />
      <PopularSection />
      <SaleSection />
    </main>
  )
}

export default Recommendation;