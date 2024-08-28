"use client"
import '@mantine/carousel/styles.css';
import {Carousel} from "@mantine/carousel";
import {Text} from '@mantine/core';
import GOOD_PRACTICES from "@/app/constants/GOOD_PRACTICES";


export default function GoodPracticesCarousel() {
  const slides = GOOD_PRACTICES.map((s) => (<Carousel.Slide key={s}>
    <div className="bg-blue-500  h-[250px] w-full px-4 flex justify-center items-center"><Text fw={700} ta="center"
                                                                                               c="white"
                                                                                               size="xl">{s}</Text>
    </div>
  </Carousel.Slide>));

  return (<div className="w-full flex flex-col items-center">
    <Text fw={1000} ta="center" size="xl" mb={50}>Pour un bon déroulement du stage, le stagiaire est mené à respecter
      les consignes suivantes:</Text>
    <div className="w-[60%]">
      <Carousel slideSize="70%" slideGap="md" loop draggable={false} withIndicators>{slides}</Carousel>
    </div>
  </div>);
  return (// <MantineProvider>
      //   <div className="flex flex-col">
      //     <List type="ordered">
      //       {GOOD_PRACTICES.map((item) => (<List.Item>• {item}</List.Item>))}
      //     </List>
      //   </div>
      // </MantineProvider>
      <Carousel withIndicators height={200}>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
        {/* ...other slides */}
      </Carousel>

  )

}
