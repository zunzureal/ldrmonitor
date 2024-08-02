require('dotenv').config({ path: '.env.development.local' });
import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
