import { observable, action, makeObservable } from 'mobx';


const TRANSITION_EFFECT = ['Fade', 'Cross Fade', 'Memory', 'Illusion', 'ripple', 'star', 'wind', 'wipe', 'slide', 'cube', 'swap', 'radial', 'door way']

class SettingsStore {
    currentTimer: number = 5000; // 5 seconds
    animationTimer: number = 500; // 0.5 seconds
    current_transition: number = 0; // 0 index

    constructor() {
        makeObservable(this, {
            currentTimer: observable,
            animationTimer: observable,
            current_transition:observable,
            updateCurrentTimer: action,
            updateAnimationTimer: action,
            updateCurrentTransition: action,
        });
    }

    updateCurrentTimer(newData: number) {
        this.currentTimer = newData;
    }

    updateAnimationTimer(newData: number) {
        this.animationTimer = newData;
    }

    updateCurrentTransition(newData:number){
        this.current_transition = newData;
    }
}

export const settingsStore = new SettingsStore();
