import { Dispatch, SetStateAction, useState } from 'react';
import './ActionIcon.scss';

type ActionIconProps = {
  text: string;
  rotate: boolean;
  setLayout: Dispatch<SetStateAction<boolean>>;
};

const ActionIcon: React.FC<ActionIconProps> = ({
  text,
  rotate,
  setLayout,
}: ActionIconProps) => {
  const [rotateArrow, setRotateArrow] = useState(false);
  return (
    <div
      className={rotate ? 'circleContainerAngled' : 'circleContainer'}
      onClick={() => {
        if (rotate) {
          setLayout(true);
        }
      }}
      onMouseEnter={() => {
        if (rotate) {
          setRotateArrow(true);
        }
      }}
      onMouseLeave={() => {
        if (rotate) {
          setRotateArrow(false);
        }
      }}
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="circlePath"
            d="M 60, 60 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
          />
        </defs>
        <circle
          cx="60"
          cy="60"
          r="47"
          stroke="#FF0301"
          strokeWidth="3"
          fill={rotateArrow ? 'red' : 'none'}
        />
        <g className="spinningText" transform="translate(60, 60)">
          <text
            fontSize={rotate ? '13.4' : '12'}
            fontWeight={600}
            fontFamily="Arial"
            fill="#fff"
          >
            <textPath href="#circlePath" startOffset="0">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
      <div
        className={rotate ? 'arrowContainerAngled' : 'arrowContainerVertical'}
      >
        <svg
          width="60"
          height="82"
          viewBox="0 0 60 82"
          style={{
            transition: 'all .3s ease',
            transform: rotate
              ? rotateArrow
                ? 'rotate(-90deg) translate(6px, -14px) scale(1.3)'
                : 'rotate(-145deg)'
              : '',
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.6712 58.988C33.6712 44.2978 34.479 50.6903 34.479 36L27.2088 36L28.0166 58.988C23.5737 54.4601 19.5347 53.7635 14.6878 52.7186L14.6878 57.9431C22.7659 61.0779 27.2088 62.1228 28.0122 73.2685L33.6756 73.2685C34.479 62.1228 38.922 61.0779 47 57.9431L47 52.7186C42.1532 53.7635 38.1142 54.4601 33.6712 58.988Z"
            fill={rotateArrow ? '#111111' : '#FF0301'}
          />
        </svg>
      </div>
    </div>
  );
};

export default ActionIcon;
