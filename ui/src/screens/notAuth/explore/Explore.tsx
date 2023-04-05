import { Route, Routes } from "react-router-dom";
import RestaurantDetails from "./RestaurantDetails";
import Restaurants from "./Restaurants";

export const restaurants = [
  {
    id: 1,
    name: "Burger King",
    location: "Koramangala",
    rating: 4.5,
    numberOfReviews: 10,
    todaysBookings: 10,
    restaurantMenu: [
      {
        id: 1,
        name: "Burger",
        price: 100,
        description: "A burger",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
          {
            id: 3,
            name: "Onion",
          },
          {
            id: 4,
            name: "Capsicum",
          },
        ],
      },
      {
        id: 2,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },
      {
        id: 3,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },

      {
        id: 4,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },

      {
        id: 5,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },

      {
        id: 6,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },

      {
        id: 7,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },

      {
        id: 8,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },
    ],
    about:
      "Burger King is an American global chain of hamburger fast food restaurants. Headquartered in the unincorporated area of Miami-Dade County, Florida, the company was founded in 1953 as Insta-Burger King, a Jacksonville, Florida–based restaurant chain. After Insta-Burger King ran into financial difficulties in 1954, its two Miami-based franchisees, David Edgerton and James McLamore, purchased the company and renamed it Burger King. In 1957, two years after the first Burger King restaurant opened, the company purchased Insta-Burger King, renaming it Insta-Burger King, Inc. The original Insta-Burger King restaurant was rebranded as a Burger King in 1959. In 1967, Burger King purchased the Canadian-based Hamburger King chain, and the two chains were merged under the Burger King name. In 1974, the company purchased the Popeyes Chicken & Biscuits chain from the founders of Church's Chicken, renaming it Popeyes Famous Fried Chicken & Biscuits. In 1978, Burger King purchased the Canadian-based King's Crown chain, and the two chains were merged under the Burger King name. In 1981, Burger King purchased the Canadian-based Burger Chef chain, and the two chains were merged under the Burger King name. In 1986, Burger King purchased the Canadian-based Tim Hortons chain, and the two chains were merged under the Burger King name. In 1997, Burger King purchased the Canadian-based Steak Queen chain, and the two chains were merged under the Burger King name. In 2002, Burger King purchased the Canadian-based Pizza Pizza chain, and the two chains were merged under the Burger King name. In 2003, Burger King purchased the Canadian-based A&W chain, and the two chains were merged under the Burger King name. In 2005, Burger King purchased the Canadian-based Boston Pizza chain, and the two chains were merged under the Burger King name. In 2006, Burger King purchased the Canadian-based Swiss Chalet chain, and the two chains were merged under the Burger King name. In 2007, Burger King purchased the Canadian-based Harvey's chain, and the two chains were merged under the Burger King name. In 2008, Burger King purchased the Canadian-based KFC chain, and the two chains were merged under the Burger King name. In 2009.",
  },
  {
    id: 2,
    name: "Dominos",
    location: "Koramangala",
    rating: 3.5,
    numberOfReviews: 10,
    todaysBookings: 10,
    restaurantMenu: [
      {
        id: 1,
        name: "Burger",
        price: 100,
        description: "A burger",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
          {
            id: 3,
            name: "Onion",
          },
          {
            id: 4,
            name: "Capsicum",
          },
        ],
      },
      {
        id: 2,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },
    ],
    about:
      "Dominos Pizza is an American pizza restaurant chain founded in 1960. The corporation is headquartered at the Domino's Farms Office Park in Ann Arbor, Michigan. It is the second largest pizza chain in the United States, after Pizza Hut, and the largest pizza chain in the world based on global retail sales. The chain is a franchise, with corporate-owned and franchise locations in the United States and international markets. The company was founded by Tom Monaghan and James Monaghan in 1960. The first store was located in Ypsilanti, Michigan. The company was sold to Bain Capital in 1998, and went public in 2004. In 2011, Bain Capital sold a majority stake in the company to a group of investors led by Apollo Global Management. In 2018, the company was valued at $8.7 billion. In 2019, the company was valued at $8.9 billion. In 2020, the company was valued at $9.1 billion. In 2021, the company was valued at $9.3 billion. In 2022, the company was valued at $9.5 billion. In 2023, the company was valued at $9.7 billion. In 2024, the company was valued at $9.9 billion. In 2025, the company was valued at $10.1 billion. In 2026, the company was valued at $10.3 billion. In 2027, the company was valued at $10.5 billion. In 2028, the company was valued at $10.7 billion. In 2029, the company was valued at $10.9 billion. In 2030, the company was valued at $11.1 billion. In 2031, the company was valued at $11.3 billion. In 2032, the company was valued at $11.5 billion. In 2033, the company was valued at $11.7 billion. In 2034, the company was valued at $11.9 billion. In 2035, the company was valued at $12.1 billion. In 2036, the company was valued at $12.3 billion. In 2037, the company was valued at $12.5 billion. In 2038, the company was valued at $12.7 billion.",
  },
  {
    id: 3,
    name: "Pizza Hut",
    location: "Koramangala",
    rating: 5,
    numberOfReviews: 10,
    todaysBookings: 10,
    restaurantMenu: [
      {
        id: 1,
        name: "Burger",
        price: 100,
        description: "A burger",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
          {
            id: 3,
            name: "Onion",
          },
          {
            id: 4,
            name: "Capsicum",
          },
        ],
      },
      {
        id: 2,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },
    ],
    about:
      "Pizza Hut is an American restaurant chain and international franchise founded in 1958 in Wichita, Kansas by Dan and Frank Carney. It provides Italian-American cuisine, including pizza, pasta, side dishes and desserts. It has 18,703 restaurants worldwide as of December 31, 2019, making it the world's largest pizza chain in terms of number of locations. It is a subsidiary of Yum! Brands, Inc., one of the world's largest restaurant companies. Pizza Hut has been a long-time advocate of the vegetarian diet, and was the first national pizza chain to offer a vegetarian pizza. In 2019, Pizza Hut was ranked as the world's 2nd most valuable restaurant brand with a brand value of $3.3 billion, according to Brand Finance. In 2020, Pizza Hut was ranked as the world's 3rd most valuable restaurant brand with a brand value of $3.2 billion, according to Brand Finance. In 2021, Pizza Hut was ranked as the world's 4th most valuable restaurant brand with a brand value of $3.1 billion, according to Brand Finance. In 2022, Pizza Hut was ranked as the world's 5th most valuable restaurant brand with a brand value of $3.0 billion, according to Brand Finance. In 2023, Pizza Hut was ranked as the world's 6th most valuable restaurant brand with a brand value of $2.9 billion, according to Brand Finance. In 2024, Pizza Hut was ranked as the world's 7th most valuable restaurant brand with a brand value of $2.8 billion, according to Brand Finance. In 2025, Pizza Hut was ranked as the world's 8th most valuable restaurant brand with a brand value of $2.7 billion, according to Brand Finance. In 2026, Pizza Hut was ranked as the world's 9th most valuable restaurant brand with a brand value of $2.6 billion, according to Brand Finance. In 2027, Pizza Hut was ranked as the world's 10th most valuable restaurant brand with a brand value of $2.5 billion, according to Brand Finance. In 2028, Pizza Hut was ranked as the world's 11th most valuable restaurant brand with a brand value of $2.4 billion, according to Brand Finance. In 2029, Pizza Hut was ranked as the world's 12.",
  },
  {
    id: 4,
    name: "Burger King",
    location: "Koramangala",
    rating: 4,
    numberOfReviews: 10,
    todaysBookings: 10,
    restaurantMenu: [
      {
        id: 1,
        name: "Burger",
        price: 100,
        description: "A burger",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
          {
            id: 3,
            name: "Onion",
          },
          {
            id: 4,
            name: "Capsicum",
          },
        ],
      },
      {
        id: 2,
        name: "Pizza",
        price: 100,
        description: "A pizza",
        ingredients: [
          {
            id: 1,
            name: "Cheese",
          },
          {
            id: 2,
            name: "Tomato",
          },
        ],
      },
    ],
    about:
      "Burger King is an American multinational chain of hamburger fast food restaurants. Headquartered in the unincorporated area of Miami-Dade County, Florida, the company was founded in 1953 as Insta-Burger King, a Jacksonville, Florida–based restaurant chain. After Insta-Burger King ran into financial difficulties in 1954, its two Miami-based franchisees, David Edgerton and James McLamore, purchased the company and renamed it Burger King. In 1957, the first Burger King restaurant outside of Florida was opened in Miami. In 1967, Burger King's original headquarters were moved to Miami-Dade County. In 1974, Burger King purchased the Steak & Ale restaurant chain and converted it to a Burger King–Steak & Ale concept. In 1979, the company purchased Popeyes Chicken & Biscuits from a New Orleans–based company. In 1981, Burger King purchased the Canadian-based Tim Hortons chain. In 1983, Burger King purchased the fast food chain Pizza Hut from PepsiCo. In 1986, Burger King purchased the fast food chain Taco Bell from PepsiCo. In 1987, Burger King purchased the fast food chain KFC from PepsiCo. In 1988, Burger King purchased the fast food chain Pizza Hut from PepsiCo. In 1989, Burger King purchased the fast food chain Taco Bell from PepsiCo. In 1990, Burger King purchased the fast food chain KFC from PepsiCo. In 1991, Burger King purchased the fast food chain Pizza Hut from PepsiCo. In 1992, Burger King purchased the fast food chain Taco Bell from PepsiCo. In 1993, Burger King purchased the fast food chain KFC from PepsiCo. In 1994, Burger King purchased the fast food chain Pizza Hut from PepsiCo. In 1995, Burger King purchased the fast food chain Taco Bell from PepsiCo. In 1996, Burger King purchased the fast food chain KFC from PepsiCo. In 1997, Burger King purchased the fast food chain Pizza Hut from PepsiCo. In 1998, Burger King purchased the fast food chain Taco Bell from PepsiCo. In 1999, Burger King purchased the fast food chain KFC from PepsiCo. In 2000, Burger King purchased the fast food chain Pizza Hut from PepsiCo. In 2001.",
  },
];
function Explore() {
  return (
    <div className="px-20 py-10">
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path=":id" element={<RestaurantDetails />} />
      </Routes>
    </div>
  );
}

export default Explore;
