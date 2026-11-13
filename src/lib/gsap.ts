import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Ten moduł jest ładowany WYŁĄCZNIE dynamicznie (import()) z Engine.tsx,
 * żeby GSAP nie blokował pierwszego renderu.
 */
gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: "expo.out", duration: 1.2 });

export { gsap, ScrollTrigger, SplitText };
