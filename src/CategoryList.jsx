import { useStates, useFetch } from 'react-easier';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SortAndPage from './SortAndPage';

export default function CategoryList() {

  const navigate = useNavigate();
  const { '*': url } = useParams();
  const { sortOrder } = useStates('store');
  const s = useStates('categoryList',
    { list: [], page: 1, info: {} }
  );

  useEffect(() => {
    s.list = useFetch(`/api/c/${url}?size=30&` +
      `page=${s.page - 1}&sort=${sortOrder}`, {
      postProcess: x => {
        s.info = { ...x, results: 'separate' };
        s.error = !x.results;
        return x.results || [];
      }
    });
  }, [url, sortOrder, s.page]);

  useEffect(() => {
    s.page < 1 && (s.page = 1);
    let max = s?.info?.pagination?.numberOfPages || 1;
    s.page > max && (s.page = max);
  }, [s.page, s.info]);

  return <main className="categoryList">
    <SortAndPage />
    {!s.error ? null : <>
      <h2>Något gick fel 😞</h2>
      <p>Pröva att välja något annat i listan till vänster...</p>
    </>}
    {!s.list.length ? null :
      <>
        {s.list.map(({ code, name, price, thumbnail }) =>
          <div
            className="product"
            onClick={() => navigate(`/produkt/${code}${location.pathname}`)}
          >
            <img
              src={thumbnail.url}
              alt={s.info.categoryInfo.name}
            />
            <h3>{name}</h3>
            <p>{price}</p>
          </div>)}
      </>
    }
  </main>;
}