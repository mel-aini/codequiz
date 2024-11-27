"use client";

import Topic from "@/components/topic";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import TopicsSkeleton from "./skeletons/topics";

type Data = {
    id: string;
    name: string;
    text: string;
    image: string;
    brandColor: string;
    createdAt: Date;
}[]

function TopicsData({data}: {data: Data}) {
	const [isMounted, setIsMounted] = useState(false);
	const swiper = useSwiper();
	
	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<>
			{!isMounted && <TopicsSkeleton />}
			{isMounted && <Swiper
				modules={[Navigation, Pagination]}
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				navigation={{
					prevEl: '#prev-slide', // Target custom Previous button
					nextEl: '#next-slide', // Target custom Next button
				}}
				breakpoints={{
					1280: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1024: {
					slidesPerView: 2,
					spaceBetween: 20,
					}
				}}
				>
				{
					data.map((topic) => {
						return (
							<SwiperSlide key={topic.id} >
								<Topic className="border p-5 h-[250px] select-none" topic={topic} />
							</SwiperSlide>
						)
					})
				}
			</Swiper>}
		</>
	 );
}

export default TopicsData;