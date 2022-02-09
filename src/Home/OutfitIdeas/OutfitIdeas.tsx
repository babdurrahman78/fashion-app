import React, { useState, useEffect } from "react";
import { useTiming } from "react-native-redash";
import axios from "axios";

import { Box, Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Background from "./Background";
import Categories from "./Categories";
import Card from "./Card";

const step = 1 / (cards.length - 1);

const OutfitIdeas = ({ navigation }: HomeNavigationProps<"OutfitIdeas">) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedIndex = useTiming(currentIndex);
  const [cards, setCards] = useState([])

  useEffect(() => {
    axios.get('http://192.168.1.10:3000/product').then((response: any) => {
      setCards(response.data);
    });
  }, [])

  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Outfit Ideas"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-bag", onPress: () => navigation.navigate("Cart") }}
      />
      <Categories />
      <Box flex={1}>
        <Background />
        {cards.map(
          ({ index, source }) =>
            currentIndex < index * step + step && (
              <Card
                key={index}
                index={index}
                animatedIndex={animatedIndex}
                step={step}
                onSwipe={() => setCurrentIndex((prev) => prev + step)}
                {...{ source }}
              />
            )
        )}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;
