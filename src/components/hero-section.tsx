"use client";

import { useEffect, useState } from "react";
import SignInButton from "./signin-button";
import { Sparkles } from 'lucide-react';
import { motion } from "motion/react";

const titleText = 'Test your coding knowledge with our interactive quizzes'

function HeroSection() {
	const [isTextRendered, setIsTextRendered] = useState(false);
	const [currentText, setCurrentText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < titleText.length) {
		  const timeout = setTimeout(() => {
			setCurrentText(prevText => prevText + titleText[currentIndex]);
			setCurrentIndex(prevIndex => prevIndex + 1);
		  }, 70);
	  
		  return () => clearTimeout(timeout);
		} else {
			setIsTextRendered(true);
		}
	  }, [currentIndex]);

	return ( 
		<div>
			<header className="absolute top-0 left-1/2 -translate-x-1/2 container flex justify-between items-center h-28">
				<span className="font-semibold text-[#0184FF]">Code Quiz</span>
				<SignInButton />
			</header>
			<div className="container h-screen flex flex-col items-center justify-center gap-10">
				<div className="flex justify-center items-center">
					<div className="text-3xl sm:text-7xl text-center font-bold text-[#0184FF] max-w-[1100px]">
						{!isTextRendered && currentText}
						{isTextRendered &&
							<>
								{currentText.substring(0, 16) + ' '}
								<motion.div
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									transition={{duration: 1}}
									className="inline"
									>
									<Sparkles className="inline size-10 sm:size-20 text-yellow-500" />
								</motion.div>
								{' ' + currentText.substring(16, currentText.length)}
							</>
						}
					</div>
				</div>
				<motion.p 
					initial={{y: 10, opacity: 0}}
					animate={{y: 0, opacity: 1}}
					transition={{duration: 1, delay: 4.5}}
					className="text-xl max-w-[700px] text-center">
					Choose a language you have skilled with <span className="text-[#0184FF] py-[1px]">Html | Css | Javascript | Typescript | Node.js | React.js</span> etc... and start learning!
				</motion.p>
				<motion.div
					initial={{y: 10, opacity: 0}}
					animate={{y: 0, opacity: 1}}
					transition={{duration: 1, delay: 5.5}}
					>
					<SignInButton />
				</motion.div>
			</div>
          </div>
	);
}

export default HeroSection;