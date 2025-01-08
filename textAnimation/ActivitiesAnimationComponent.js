// import {TweenMax, Power2, TimelineLite} from "gsap";
import { TweenMax, TimelineMax, Power2, Power1, TweenLite, Circ } from 'gsap/all';

class ActivitiesAnimationComponent {
    constructor(options) {
        console.log(options)
        this.el = options.el;
        this._setup();
        this._setupEventListener();
    }
 
    _setup() {
        this._ui = {
            animationContainer: this.el.querySelector('.section-activites__content'),
            imageAnimationContainer: this.el.querySelector('.section-activites__images-container'),
            nextImageContainer: this.el.querySelector(".section-activites__next-image"),
            currentImageContainer: this.el.querySelector(".section-activites__current-image"),
            nextImage: this.el.querySelector(".section-activites__next-image .section-activites__image"),
            currentImage: this.el.querySelector(".section-activites__current-image .section-activites__image"),
            listActivities: this.el.querySelector(".section-activites__list"),
            activity: this.el.querySelectorAll(".section-activites__list-item"),
            activityLinks: this.el.querySelectorAll(".section-activites__list-item a"),
            activityLinksSpan: this.el.querySelectorAll(".section-activites__list-item a span")

        }
        this.mouse = { x: 0, y: 0 };
        this._setupTween();


    }

    _setupTween() {
        this.timelineIntro = new TimelineMax({ paused: true, onComplete: () => { this._onCompleteIntro() } });
        this.timelineIntro
            .fromTo(this._ui.nextImageContainer, 1, { height: 0 }, { height: 500, ease: Power2.easeInOut }, 0)
            .fromTo(this._ui.nextImage, 1.1, { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1, ease: Power1.easeOut }, 0)
    }

    _setupEventListener() {
        this._ui.animationContainer.addEventListener('mousemove', () => this._mouseFollow());

        for (let index = 0; index < this._ui.activity.length; index++) {
            this._ui.activity[index].addEventListener('mouseenter', () => { this._mouseEnterFunction(index) });
        }

        this._ui.listActivities.addEventListener('mouseleave', () => this._leaveContainer());

    }

    _mouseEnterFunction(index) {
        TweenMax.to(this._ui.imageAnimationContainer, .5, { autoAlpha: 1, ease: Power1.easeInOut });
        if (this._ui.currentImage.src === "") {
            this._firstImageAnimation(index);
        } else {
            this._imageAnimation(index);
            this._textAnimation(index);
        }
    }

    _textAnimation(index) {
        let textBounds = this._ui.activityLinks[index].getBoundingClientRect();
        let imageAnimationContainerBounds = this._ui.imageAnimationContainer.getBoundingClientRect();
        this._ui.activityLinks[index].addEventListener('mousemove', () => {

            let positionMouse = event.clientX - textBounds.left,
                minPositionPath = positionMouse - imageAnimationContainerBounds.width / 2,
                maxPositionPath = positionMouse + imageAnimationContainerBounds.width / 2;

            TweenMax.to(this._ui.activityLinksSpan[index], 0.7, { webkitClipPath: `polygon(${minPositionPath}px 0, ${maxPositionPath}px 0, ${maxPositionPath}px 100%, ${minPositionPath}px 100%)`, ease: Power2.easeInCubic });
            TweenMax.to(this._ui.activityLinksSpan[index], 0.7, { clipPath: `polygon(${minPositionPath}px 0, ${maxPositionPath}px 0, ${maxPositionPath}px 100%, ${minPositionPath}px 100%)`, ease: Power2.easeInCubic });

        });
    }

    _firstImageAnimation(index) {
        this._ui.currentImage.style.opacity = 0;
        this._ui.nextImage.src = this._ui.activity[index].dataset.image;
        this.currentImageLink = this._ui.activity[index].dataset.image;
        this._ui.currentImage.src = this.currentImageLink;

        this.timelineIntro.play();
    }

    _leaveContainer() {
        TweenMax.to(this._ui.imageAnimationContainer, .5,
            {
                autoAlpha: 0,
                onComplete: () => {
                    this._ui.currentImage.src = "";
                    this._ui.nextImage.src = "";
                },
                ease: Power1.easeInOut
            }
        );
    }

    _onCompleteIntro() {
        this._ui.currentImage.src = this.currentImageLink;
        this._ui.currentImage.style.opacity = 1
    }

    _onCompleteImageChange() {
        this._ui.currentImage.src = this.currentImageLink
    }

    _imageAnimation(index) {
        this.currentImageLink = this._ui.activity[index].dataset.image;
        this._ui.nextImage.src = this._ui.activity[index].dataset.image;
        TweenLite.fromTo(this._ui.nextImageContainer, 1, { height: 0, ease: Power2.easeInOut }, { height: 500, ease: Power2.easeInOut, onComplete: () => this._onCompleteImageChange() }, 0)
        TweenLite.fromTo(this._ui.nextImage, 1.1, { scale: 1.3 }, { scale: 1, ease: Power1.easeOut }, 0)
    }

    _mouseFollow() {
        let imageAnimationContainerBounds = this._ui.imageAnimationContainer.getBoundingClientRect();

        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY - this.el.getBoundingClientRect().y;


        TweenMax.to(this._ui.imageAnimationContainer, 0.7, { x: this.mouse.x - (imageAnimationContainerBounds.width / 2), y: this.mouse.y - (imageAnimationContainerBounds.height / 2), ease: Power2.easeInCubic })
    }

}
// const instance = new ActivitiesAnimationComponent();
// instance._setup()
// export default ActivitiesAnimationComponent;


const COMPONENTS = {
    'activities-animation': ActivitiesAnimationComponent
}

class ComponentFactory {
    constructor() {
        this._selector = 'data-component';
        this._elements = document.querySelectorAll(`[${this._selector}]`);
        this._components = {};
    }

    start() {
        for (let i = 0, limit = this._elements.length; i < limit; i++) {
            const element = this._elements[i];
            const componentName = element.getAttribute(this._selector);
            if (COMPONENTS[componentName]) {
                const Component = COMPONENTS[componentName];
                new Component({ el: element });
            } else {
                console.log(`Component: '${componentName}' not found`);
            }
        }
    }
}

const instance = new ComponentFactory();
instance.start()
