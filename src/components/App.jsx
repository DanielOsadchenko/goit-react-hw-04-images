import {useState, useEffect} from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';
import Button from './Button/Button';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(null);
  

  const saveSearchQuerry = (query) => {
    setQuery(query);
    setPage(1)
  }

  useEffect(() => {
    if (query === '') {
      return
    }
    setLoading(true);
    fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=30188307-c49a871897b6d5bfff07bff1b&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(images => {
        
        if (page === 1) {
          setImages([...images.hits])
          return;
        }
        setImages(prev => [...prev, ...images.hits]);
      })
      .catch(error => setError(error))
      .finally(() => { setLoading(false); });
  }, [page, query]);
  
  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const getIndex = (index) => {
    setIndex(index);
  };
  
  if (error) {
    console.log(error)
  }

  return <div className={css.App}>
      <SearchBar onSubmit={saveSearchQuerry}></SearchBar>

      <ImageGallery>
        {images.map((image, index) => {
          return < ImageGalleryItem onClick={toggleModal} getIndex={getIndex} key={image.id} index={index} image={image.webformatURL} tags={image.tags} />
        })}
      </ImageGallery>
      
      {loading && <ThreeDots
          height="300"
          width="300"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{justifyContent: 'center'}}
          wrapperClassName=""
          visible={true} />}

    {images.length >= 12 && images.length % 12 === 0 && <Button onClick={() => { setPage(prevPage => prevPage + 1) }} />}
    

      {showModal && <Modal onClose={toggleModal}><img src={images[index].largeImageURL} alt={images[index].tags}/></Modal>}
    </div>
  }
