import css from "./ImageGallery.module.css";
import PropTypes from 'prop-types';



export default function ImageGallery ({children}) {
  return <ul className={css.ImageGallery}>
    {children}
    </ul>
}

ImageGallery.propTypes = {
  children: PropTypes.array
}