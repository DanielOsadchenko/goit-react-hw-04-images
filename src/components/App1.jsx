
  handleClick = () => {
    this.setState({ loading: true });
    
    fetch(`https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=30188307-c49a871897b6d5bfff07bff1b&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(images => this.setState(prevState => ({ images: [...prevState.images, ...images.hits] })))
      .catch(error => this.setState({ error }))
      .finally(() => { this.setState({ loading: false }); this.setState(prevState => ({ page: prevState.page + 1 })) });
  }

  getIndex = (index) => {
    console.log(index)
  this.setState({index})
  }
