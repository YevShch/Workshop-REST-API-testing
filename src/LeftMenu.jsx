import { useStates, useFetch } from 'react-easier';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function LeftMenu() {

  const s = useStates({
    lastClickId: 0,
    categories: useFetch(
      '/api/leftMenu/categorytree',
      { postProcess: x => x.children }
    )
  });

  function setActive() {
    if (!s.categories.length) { // wait for fetch
      setTimeout(setActive, 10); return;
    }
    // traverse all categories, set active + showChildren
    let categories = s.categories._;
    JSON.stringify(categories, function (key, val) {
      if (key === 'url') {
        this.active = false;
        this.showChildren = false;
        if (pathname.includes('/' + val)) {
          this.active = true;
          (!new RegExp('/' + val + '$').test(pathname)
            || s.lastClick === s.lastClickId)
            && (this.showChildren = true);
        }
      }
      return val;
    });
    s.categories = categories;
  }

  const { pathname } = useLocation();
  useEffect(setActive, [pathname]);

  function renderList(cats = s.categories) {
    return cats.map(x =>
      <div>
        <Link
          to={'/kategori/' + x.url}
          className={x.active ? 'active' : ''}
          onClick={() => s.lastClick = ++s.lastClickId}
        >
          {x.title}
        </Link>
        {!x.children.length ? null : <button
          onClick={() => x.showChildren = !x.showChildren}>
          {x.showChildren ? '-' : '+'}
        </button>}
        {!x.showChildren ? null : renderList(x.children)}
      </div>);
  }

  return <aside className="leftMenu">
    <nav>{renderList()}</nav>
  </aside>;
}