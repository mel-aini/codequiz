"use client";

import { Subscription } from "@prisma/client";
import { useEffect, useState } from "react";

declare module "react" {
    interface CSSProperties {
      "--progress"?: number | string;
    }
  }

interface Props {
	data: Subscription
}

function PropgressCircle({data}: Props) {
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
		const id = setInterval(animate, 50);

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
		<div className="flex justify-center relative">
			<svg width="200" height="200" viewBox="0 0 250 250" className="circular-progress" style={{"--progress": showedProgress}}>
				<circle className="bg"></circle>
				<circle className="fg"></circle>
			</svg>
			<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 text-2xl font-medium">{showedProgress}%</span>
		</div>
	 );
}

export default PropgressCircle;