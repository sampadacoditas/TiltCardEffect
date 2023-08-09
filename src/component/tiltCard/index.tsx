import { useEffect, useRef, useState } from "react";
import { Tilt } from "react-tilt";
import readCursor from "./../../assets/images/read-cursor.svg";
import styles from "./tiltCard.module.scss";
const defaultOptions = {
  reverse: true,
  max: 15, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};
interface ITiltCardComponent {
  image: string;
  text: string;
  className: string;
}

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const mousePosition = {
  mouseX: 0,
  mouseY: 0,
};

const pointPosition = {
  mouseX: 0,
  mouseY: 0,
};

const customCursorPointer = (
  refrence: HTMLDivElement,
  mousePosition: { mouseX: number; mouseY: number }
) => {
  const currentPos = { x: 0, y: 0 };
  const data = refrence.getAttribute("data-amt");
  const amount = data ? +data : 1;
  const compute = () => {
    currentPos.x = lerp(currentPos.x, mousePosition.mouseX, amount);
    refrence.style.left = `${currentPos.x}px`;

    currentPos.y = lerp(currentPos.y, mousePosition.mouseY, amount);
    refrence.style.top = `${currentPos.y}px`;
    window.requestAnimationFrame(compute);
  };
  compute();
};

const TiltCardComponent = (props: ITiltCardComponent) => {
  const { image, text, className } = props;

  const pointerRef = useRef<HTMLImageElement>(null);
  const [onHover, setOnHover] = useState(false);

  const elementE1 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      mousePosition.mouseX = e.clientX;
      mousePosition.mouseY = e.clientY;

      if (elementE1.current) {
        pointPosition.mouseX = e.clientX;
        pointPosition.mouseY = e.clientY;
      }
    });
    if (elementE1.current) {
      customCursorPointer(elementE1.current, mousePosition);
    }
  }, []);

  const readOnClickFunction = () => {
    console.log("aergwg");
  };

  return (
    <div
      className={
        className
          ? `${className}${styles.cardComponentContainer}`
          : styles.cardComponentContainer
      }
    >
      <div
        className={styles.mainSubContainer}
        onClick={readOnClickFunction}
        onMouseEnter={() => {
          //   pointerRef.current?.classList.remove(styles.circleEnd);
          //   setTimeout(() => {
          setOnHover(true);
          // }, 300);
          // document.getElementById('text')!.style.opacity = '1';
        }}
        onMouseLeave={() => {
          // document.getElementById('text')!.style.opacity = '0';
          // pointerRef.current?.classList.add(styles.circleEnd);
          // setTimeout(() => {
          setOnHover(false);
          // }, 300);
        }}
      >
        <Tilt
          options={defaultOptions}
          className={styles["tilt-box-wrap"]}
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
        >
          <img src={image} alt="" className={` ${styles.cardImage}`} />
        </Tilt>
        <div
          ref={elementE1}
          // className={onHover ? styles['cursor'] : styles['cursor-end']}
          data-amt="0.20"
          className={styles["cursor"]}
        >
          {onHover && (
            <img
              ref={pointerRef}
              src={readCursor}
              height={68}
              width={68}
              className={styles.circle}
            />
          )}
          {onHover && <span className={styles["cursor-text"]}>Read</span>}
        </div>
      </div>
      <div>{text}</div>
    </div>
  );
};
export default TiltCardComponent;

// import { useEffect, useRef, useState } from 'react';
// import { Tilt } from 'react-tilt';
// import styles from './tiltCard.module.scss';
// const defaultOptions = {
//   reverse: true,
//   max: 15, // max tilt rotation (degrees)
//   perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
//   scale: 1, // 2 = 200%, 1.5 = 150%, etc..
//   speed: 1000, // Speed of the enter/exit transition
//   transition: true, // Set a transition on enter/exit.
//   axis: null, // What axis should be disabled. Can be X or Y.
//   reset: true, // If the tilt effect has to be reset on exit.
//   easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
// };
// interface ITiltCardComponent {
//   image: string;
//   text: string;
//   className: string;
// }

// const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

// const mousePosition = {
//   mouseX: 0,
//   mouseY: 0,
// };

// const pointPosition = {
//   mouseX: 0,
//   mouseY: 0,
// };

// const TiltCardComponent = (props: ITiltCardComponent) => {
//   const { image, text, className } = props;

//   const [showCursor, setShowCursor] = useState<boolean>(false);

//   const customCursorPointer = (
//     refrence: HTMLDivElement,
//     mousePosition: { mouseX: number; mouseY: number },
//   ) => {
//     const currentPos = { x: 0, y: 0 };
//     const amount = 0.2;
//     // refrence.style.height = '68px';
//     // refrence.style.width = '68px';
//     const compute = () => {
//       currentPos.x = lerp(currentPos.x, mousePosition.mouseX, amount);
//       refrence.style.left = `${currentPos.x}px`;
//       // if (parseInt(refrence.style.height)) {
//       //   refrence.style.height = `${parseInt(refrence.style.height) - 0.5}px`;
//       // }

//       currentPos.y = lerp(currentPos.y, mousePosition.mouseY, amount);
//       refrence.style.top = `${currentPos.y - 120}px`;
//       // if (parseInt(refrence.style.width)) {
//       //   refrence.style.width = `${parseInt(refrence.style.width) - 0.5}px`;
//       // }

//       const scaleValue = 1 + currentPos.x / 1000; // Adjust the scaling factor as needed
//       refrence.style.transform = `scale(${scaleValue})`;

//       // Calculate rotation angle based on cursor position
//       const rotationAngle = (currentPos.x - window.innerWidth / 2) / 50; // Adjust the rotation factor as needed

//       // Apply rotation using transform
//       refrence.style.transform += ` rotate(${rotationAngle}deg)`;

//       requestAnimationFrame(compute);
//     };
//     compute();
//   };

//   const elementE1 = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (elementE1.current) {
//       customCursorPointer(elementE1.current, mousePosition);
//     }
//   }, []);

//   const readOnClickFunction = () => {
//     console.log('aergwg');
//   };

//   return (
//     <div
//       className={
//         className
//           ? `${className}${styles.cardComponentContainer}`
//           : styles.cardComponentContainer
//       }
//       onMouseMove={e => {
//         mousePosition.mouseX = e.clientX;
//         mousePosition.mouseY = e.clientY;

//         if (elementE1.current) {
//           pointPosition.mouseX = e.clientX;
//           pointPosition.mouseY = e.clientY;
//         }
//       }}>
//       <div
//         className={styles.mainSubContainer}
//         onClick={readOnClickFunction}
//         // onMouseLeave={() => {
//         //   elementE1.current?.classList.remove(styles.circleEnd);

//         //   document.getElementById('text')!.style.opacity = '1';
//         // }}
//         // onMouseMove={e => {
//         //   mousePosition.mouseX = e.clientX;
//         //   mousePosition.mouseY = e.clientY;

//         //   if (elementE1.current) {
//         //     pointPosition.mouseX = e.clientX;
//         //     pointPosition.mouseY = e.clientY;
//         //   }
//         // }}
//       >
//         <Tilt options={defaultOptions} className={styles['tilt-box-wrap']}>
//           <img src={image} alt="" className={` ${styles.cardImage}`} />
//           <div
//             ref={elementE1}
//             className={styles['mf-cursor']}
//             // style={{will-change: auto; transform: translate(1298.89px, 567.061px) rotate(-28.5702deg) scale(1, 0.999999)}}
//           >
//             {/* <div
//             className={styles["mf-cursor-inner"]}
//             // style={{transform: rotate(28.5702deg);}}
//           > */}
//             <div
//               className={styles['mf-cursor-media']}
//               // style={{width: 150px, height: 150px; margin: -70px,0px,0px,-70px;}}
//             >
//               <div className={styles['mf-cursor-media-box']}>
//                 Read
//               </div>
//             </div>
//             <div className={styles['mf-cursor-text']}></div>
//             {/* </div> */}
//           </div>
//         </Tilt>

//         {/* <div ref={elementE1} className={`${styles['cursor']} ${styles.circle}`}>
//           <span className={styles['cursor-text']} id="text">
//             Read
//           </span>
//         </div> */}
//       </div>
//       <div>{text}</div>
//     </div>
//   );
// };
// export default TiltCardComponent;
