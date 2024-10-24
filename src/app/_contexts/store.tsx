"use client"

import { Subscription } from "@prisma/client";
import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

export enum OPTIONS {
    IS_QUIZ_OPEN
}

export interface GlobalStateProps {
	isQuizOpen: boolean
    activeSubscription: Subscription | null
    topicBgColor: string
}

const initialState: GlobalStateProps = {
    isQuizOpen: false,
    activeSubscription: null,
    topicBgColor: ''
};

export const GlobalContext = createContext<{state: GlobalStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: GlobalStateProps, action: any) => {
	switch (action.type)
	{
		case OPTIONS.IS_QUIZ_OPEN:
            return {
                isQuizOpen: action.state,
                activeSubscription: action.state ? action.topic : null,
                topicBgColor: action.bg
            }
		default:
			return state;
	}
}

const GlobalContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<GlobalContext.Provider value={{state, dispatch}}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContextProvider;