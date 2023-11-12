import { observable, action, makeObservable } from 'mobx';
import { imageSliderStore } from './ImageSlider.store';
import * as keys from '../src/consts/Key.const'

// const TRANSITION_EFFECT = ['Fade', 'Cross Fade', 'Memory', 'Illusion', 'ripple', 'star', 'wind', 'wipe', 'slide', 'cube', 'swap', 'radial', 'door way']

class SettingsStore {
    current_timer: number = 5000; // 5 seconds
    animation_timer: number = 500; // 0.5 seconds
    current_transition: string = "Fade";
    display_effect: string = "Scale to Fit Center";
    photo_order: string = "Shuffle";

    constructor() {
        makeObservable(this, {
            current_timer: observable,
            animation_timer: observable,
            current_transition: observable,
            display_effect: observable,
            photo_order: observable,
            updateCurrentTimer: action,
            updateAnimationTimer: action,
            updateCurrentTransition: action,
            update_all_data: action,
        });
    }

    updateCurrentTimer(newData: number) {
        this.current_timer = newData;
    }

    updateAnimationTimer(newData: number) {
        this.animation_timer = newData;
    }

    updateCurrentTransition(newData: string) {
        this.current_transition = newData;
    }

    updateDisplayEffect(newData: string) {
        this.display_effect = newData;
    }

    updatePhotoOrder(newData: string) {
        this.photo_order = newData;
    }

    async update_all_data() {
        let curr_data = await imageSliderStore.retrieveData(keys.AnimationTimerKey);
        if (curr_data !== null) this.animation_timer = parseInt(curr_data);

        curr_data = await imageSliderStore.retrieveData(keys.currentTimerKey);
        if (curr_data !== null) this.current_timer = parseInt(curr_data);

        curr_data = await imageSliderStore.retrieveData(keys.photoOrderKey);
        if (curr_data !== null) this.photo_order = curr_data;

        curr_data = await imageSliderStore.retrieveData(keys.displayEffectKey);
        if (curr_data !== null) this.display_effect = curr_data;

        curr_data = await imageSliderStore.retrieveData(keys.currentTransitionKey);
        if (curr_data !== null) this.current_transition = curr_data;
    }
}

export const settingsStore = new SettingsStore();
