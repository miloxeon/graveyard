import React, { FC } from "react";
import Scrollspy from "react-scrollspy";
import { scroller } from "react-scroll";
import styles from "./styles.module.css";

import { ReactComponent as Clock } from "./assets/clock.svg";
import { ReactComponent as ClockActive } from "./assets/clock-active.svg";
import { ReactComponent as Smile } from "./assets/smile.svg";
import { ReactComponent as SmileActive } from "./assets/smile-active.svg";
import { ReactComponent as Dog } from "./assets/dog.svg";
import { ReactComponent as DogActive } from "./assets/dog-active.svg";
import { ReactComponent as Apple } from "./assets/apple.svg";
import { ReactComponent as AppleActive } from "./assets/apple-active.svg";
import { ReactComponent as Car } from "./assets/car.svg";
import { ReactComponent as CarActive } from "./assets/car-active.svg";
import { ReactComponent as Ball } from "./assets/ball.svg";
import { ReactComponent as BallActive } from "./assets/ball-active.svg";
import { ReactComponent as Lamp } from "./assets/lamp.svg";
import { ReactComponent as LampActive } from "./assets/lamp-active.svg";
import { ReactComponent as Flag } from "./assets/flag.svg";
import { ReactComponent as FlagActive } from "./assets/flag-active.svg";

interface Props {
  /** List of categories to display */
  categories: string[];
  /** List of categories to be disabled and unfocusable */
  disabledCategories: string[];
}

interface IconsDict {
  [category: string]: {
    icon: FC;
    iconActive: FC;
  };
}

const icons: IconsDict = {
  Recents: {
    icon: Clock,
    iconActive: ClockActive
  },
  "Smileys & Emotion": {
    icon: Smile,
    iconActive: SmileActive
  },
  "Animals & Nature": {
    icon: Dog,
    iconActive: DogActive
  },
  "Food & Drink": {
    icon: Apple,
    iconActive: AppleActive
  },
  "Travel & Places": {
    icon: Car,
    iconActive: CarActive
  },
  Activities: {
    icon: Ball,
    iconActive: BallActive
  },
  Objects: {
    icon: Lamp,
    iconActive: LampActive
  },
  Flags: {
    icon: Flag,
    iconActive: FlagActive
  }
};

const indicatorStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  padding: "0 16px"
};

const Indicator: FC<Props> = ({ categories, disabledCategories }) => {
  return (
    <Scrollspy
      items={categories.map(category => `emojiPicker-${category}`)}
      // className={styles.root}
      componentTag="div"
      style={indicatorStyle}
      currentClassName={styles.active}
      rootEl="#scrollSpyContainer"
    >
      {categories.map(category => {
        const Icon = icons[category].icon;
        const IconActive = icons[category].iconActive;
        return (
          <a
            key={category}
            className={
              disabledCategories.includes(category)
                ? styles.iconDisabled
                : styles.icon
            }
            tabIndex={disabledCategories.includes(category) ? -1 : 0}
            href={`#emojiPicker-${category}`}
            onClick={e => {
              e.preventDefault();
              scroller.scrollTo(`emojiPicker-${category}`, {
                duration: 150,
                smooth: true,
                offset: -180,
                containerId: "scrollSpyContainer"
              });
            }}
          >
            <div className={styles.iconContainer}>
              <Icon />
            </div>
            <div className={styles.iconActiveContainer}>
              <IconActive />
            </div>
          </a>
        );
      })}
    </Scrollspy>
  );
};

export default Indicator;
