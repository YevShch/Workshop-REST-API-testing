import { useStates, useFetch } from 'react-easier';
import { useParams } from 'react-router-dom';

export default function Product() {

  const { code } = useParams();

  const s = useStates({
    info: useFetch(`/api/axfood/rest/p/${code}`)
  });
  const product = s.info[0];

  const display = {
    'description': ['Beskrivning'],
    'consumerStorageInstructions': ['Förvaring',
      x => x.replace(/FÖRVARING:*/, '')],
    'ingredients': ['Ingredienser',
      x => x.replace(/INGREDIENSER:*/, '')
        .replace(/([a-z])\d/g, '$1')
        .replace(/[A-ZÅÄÖ]{2,}/g, (x) =>
          x[0] + x.slice(1).toLowerCase())
    ]
  };

  return !product ? null : <div className="product-details">
    <img
      src={product.image.url}
      aria-colcount={product.image.alt}
    />
    <h2>{product.name}</h2>
    {Object.entries(display).map(([key, [label, process]]) => <>
      {!product[key] ? null : <p>
        <b>{label}</b><br />
        {(process || (x => x))(product[key])}
      </p>}
    </>)}
  </div>;
}