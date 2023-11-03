import { FC, useState, createContext, useContext } from "react";
import * as keys from '../../../consts/Key.const'
import { useImageSliderContext } from "./ImageSliderContext";


interface SettingsContextValue {
    current_timer: number;
    animation_timer: number;
    current_transition: string;
    display_effect: string;
    photo_order: string;
    setCurrentTimer: (value: number) => void;
    setAnimationTimer: (value: number) => void;
    setCurrentTransition: (value: string) => void;
    setDisplayEffect: (value: string) => void;
    setPhotoOrder: (value: string) => void;
    update_all_data: () => void;
}

// Create the context with an initial value
export const SettingsContext = createContext<SettingsContextValue | null>(null);
export const useSettingsContext = () => useContext(SettingsContext)!;

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [current_timer, setCurrentTimer] = useState<number>(5000);
    const [animation_timer, setAnimationTimer] = useState<number>(500);
    const [current_transition, setCurrentTransition] = useState<string>("Fade");
    const [display_effect, setDisplayEffect] = useState<string>("Scale to Fit Center");
    const [photo_order, setPhotoOrder] = useState<string>("Shuffle");
    const { retrieveData } = useImageSliderContext();


    async function update_all_data() {
        let curr_data = await retrieveData(keys.AnimationTimerKey);
        if (curr_data !== null) setAnimationTimer(parseInt(curr_data));

        curr_data = await retrieveData(keys.currentTimerKey);
        if (curr_data !== null) setCurrentTimer(parseInt(curr_data));

        curr_data = await retrieveData(keys.photoOrderKey);
        if (curr_data !== null) setPhotoOrder(curr_data);

        curr_data = await retrieveData(keys.displayEffectKey);
        if (curr_data !== null) setDisplayEffect(curr_data);

        curr_data = await retrieveData(keys.currentTransitionKey);
        if (curr_data !== null) setCurrentTransition(curr_data);
    }

    const ctxValue: SettingsContextValue = {
        current_timer,
        animation_timer,
        current_transition,
        display_effect,
        photo_order,
        setCurrentTimer,
        setAnimationTimer,
        setCurrentTransition,
        setDisplayEffect,
        setPhotoOrder,
        update_all_data
    };

    return (
        <SettingsContext.Provider value={ctxValue}>{children}</SettingsContext.Provider>
    );
};
