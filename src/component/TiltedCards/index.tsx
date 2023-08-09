
import TiltCardComponent from "../tiltCard/index";
import TiltCard1 from '../../assets/images/tilt-card1.svg';
import classes from "./tiltCard.module.scss"


const TitledCards = () => {
  return (
    <div className={classes.container}>
      <TiltCardComponent
        image={TiltCard1}
        text={''}
        className={classes.TiltCard1}
      />
    </div>
  );
};

export default TitledCards;
