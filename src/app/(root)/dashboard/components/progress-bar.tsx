"use client";

import { Subscription } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
	data: Subscription
}

function ProgressBar({data}: Props) {
	const [progress, setProgress] = useState(0);
	const [showedProgress, setShowedProgress] = useState(0);

	useEffect(() => {
		if (data.isComplete) {
			setProgress(100)
		} else {
			setProgress((data.questionNumber - 1) / data.totalQuestions * 100)
		}
	}, [data])

	useEffect(() => {
		let currentProgress = 0;
		const id = setInterval(animate, 30);

		function animate()  {
			currentProgress += 1;
			setShowedProgress(currentProgress);
			if (currentProgress >= progress) {
				clearInterval(id);
			}
		}

		return () => clearInterval(id);
	}, [progress])
	
	return ( 
		<div className="relative w-full rounded-full h-3 bg-[#B9B9B9] overflow-hidden">
			<div
				style={{left: `-${100 - showedProgress}%`}}
				className="absolute top-0 w-full rounded-full h-3 bg-[#0084FF] duration-75 ease-out" 
			/>
		</div>
	 );
}

export default ProgressBar;