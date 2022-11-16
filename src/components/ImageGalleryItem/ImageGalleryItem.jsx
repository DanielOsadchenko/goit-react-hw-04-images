import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';


export default function ImageGalleryItem({ getIndex, image, tags, onClick, index }) {
    return <li onClick={onClick} className={css.ImageGalleryItem}><img onClick={() => getIndex(index)} src={image} alt={tags} className={css.image}  /> </li>
}

ImageGalleryItem.propTypes = {
  getIndex: PropTypes.func,
  image: PropTypes.string,
  tags: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
}