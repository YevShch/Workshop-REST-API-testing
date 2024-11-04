import { useStates } from 'react-easier';
import { useEffect } from 'react';

export default function SortAndPage() {

  const s = useStates('store');
  const cList = useStates('categoryList');
  const { pagination, categoryInfo } = cList.info;

  useEffect(() => { cList.page = 1 }, [s.sortOrder]);

  return !pagination ? null : <div className="sortAndPageField">
    <button
      disabled={cList.page === 1}
      onClick={() => cList.page > 1 && cList.page--}
    >&lt;</button>&nbsp;&nbsp;
    <label>
      Sida:&nbsp;
      <input
        type="number"
        min="1" max={pagination.numberOfPages}
        {...cList.bind('page')}
      />&nbsp;/&nbsp;{pagination.numberOfPages}
    </label>
    &nbsp;&nbsp;<button
      disabled={cList.page === pagination.numberOfPages}
      onClick={() => cList.page < pagination.numberOfPages && cList.page++}
    >&gt;</button>
    <label className="sortLabel">Sortera:
      <select {...s.bind('sortOrder')}>
        {cList.info.sorts.map(({ name, code }) =>
          <option value={code}>{name}</option>)}
      </select>
    </label>
    <h2>{categoryInfo.name}</h2>
  </div>;
}