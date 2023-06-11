import React from 'react';
import axios from 'axios';

class ImgLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [0, 0, 0],
      textColor: 'black',
      images: [],
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async () => {
    try {
      const response = await axios.get(
        'https://api.pexels.com/v1/search?query=nature&per_page=3',
        {
          headers: {
            Authorization: 'LUjgI4vpZNnhbtutysngG7PKI8CeZfcpDZkpdJpcChtG4G62NYNbr9vW', // Pexels API anahtarınızı buraya ekleyin
          },
        }
      );
      const images = response.data.photos.map((photo) => photo.src.medium);
      this.setState({ images });
    } catch (error) {
      console.error(error);
    }
  };

  handleClick = (index) => {
    this.setState((prevState) => {
      const newLikes = [...prevState.likes];
      newLikes[index] += 1;
      return {
        likes: newLikes,
        textColor: this.getRandomColor(),
      };
    });
  };

  getRandomColor = () => {
    const colors = ['red', 'blue', 'green', 'purple', 'orange'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  render() {
    const {likes, textColor, images } = this.state;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {images.map((imageUrl, index) => (
          <div key={index} style={{ margin: '1rem',display:'flex', flexDirection:'column'}}>
            <img src={imageUrl} alt={`Photo ${index + 1}`} width={400} height={400} style={{marginTop:'6rem'}}/>
            <button onClick={() => this.handleClick(index)} style={{ marginTop: '1rem', backgroundColor:'#5D5C5F', color:'yellow', fontSize:'25px', border:'none' }}>
              Like
            </button>
            <p style={{ color: textColor, fontSize: '20px', marginTop: '0.5rem', textAlign:'center', fontSize:'30px'}}>
              {likes[index]} 
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default ImgLikes;
