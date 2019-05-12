import React, { Component } from "react";
import { Container, List, Content } from "native-base";
import { AsyncStorage } from "react-native";

import SearchBar from "./components/SearchBar";
import PlaceList from "./components/PlaceList";
import { API_PATH } from "../config/keys";
import axios from "axios";

class SearchYelpPage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      term: "",
      location: ""
    };
  }

  componentDidMount = () => {
    const location = AsyncStorage.getItem("zipCode", (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      location
        ? this.setState({ location: JSON.parse(result) })
        : this.setState({ location: null });
    });
  };

  handleChange = name => event => {
    this.setState(
      { [name]: event.nativeEvent.text }
      // this.yelpApi(this.state.term)
    );
  };

  yelpApi = (term, location) => {
    console.log("in search");
    axios
      .get(`${API_PATH}/yelp/search?term=${term}&location=${location}`)
      .then(response => {
        // console.log(response.data);
        this.setState({ data: [] });
        for (let ele in response.data) {
          let curData = response.data[ele];
          // console.log(curData);
          this.setState({
            data: [
              ...this.state.data,
              {
                category: curData.categories[0].title,
                phone: curData.display_phone,
                id: curData.id,
                imageUrl: curData.image_url,
                isClosed: curData.is_closed,
                address: curData.location.display_address[0],
                name: curData.name,
                price: curData.price,
                rating: curData.rating,
                reviewCount: curData.review_count,
                yelpUrl: curData.url
              }
            ]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitSearch = event => {
    let { location, term } = this.state;
    if (typeof location === "number" && location.length !== 5) {
      console.log("invalid zip code");
    } else {
      this.yelpApi(term, location);
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <SearchBar
            handleChange={event => this.handleChange(event)}
            location={this.state.location}
            term={this.state.term}
            submit={event => {
              this.submitSearch(event);
            }}
          />
          <List style={{ paddingTop: 30 }}>
            {this.state.data.map((item, i) => {
              return <PlaceList dataList={item} key={i} />;
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

export default SearchYelpPage;
